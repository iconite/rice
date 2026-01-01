
import { db } from './drizzle';
import { eq } from 'drizzle-orm';
import { config, products, subProducts, varieties } from './schema';
import { Product, ProductType } from './products';

export interface SiteData {
  contact: {
    email: string;
    phone: string;
    address: string;
    whatsapp: string;
  };
  products: Product[];
}

export async function getSiteData(): Promise<SiteData> {
  try {
    // Get Contact
    const contactConfig = await db.query.config.findFirst({
        where: eq(config.key, 'contact')
    });
    
    const contact = contactConfig?.value ? JSON.parse(contactConfig.value) : {
      email: '',
      phone: '',
      address: '',
      whatsapp: ''
    };

    // Get Products with relations
    const productsData = await db.query.products.findMany({
        with: {
            varieties: true,
            subProducts: true,
        }
    });

    const mappedProducts: Product[] = productsData.map(p => ({
        slug: p.slug,
        title: p.title || '',
        origin: p.origin || '',
        description: p.description || '',
        detailedDescription: p.detailedDescription || '',
        image: p.image || '',
        climate: p.climate || '',
        growingSeason: p.growingSeason || '',
        yield: p.yield || '',
        isHighDemand: p.isHighDemand || false,
        varieties: p.varieties.map(v => v.name || ''),
        types: p.subProducts.map(t => ({
             slug: t.slug,
             title: t.title || '',
             origin: t.origin || '',
             description: t.description || '',
             detailedDescription: t.detailedDescription || '',
             image: t.image || '',
             climate: t.climate || '',
             growingSeason: t.growingSeason || '',
             yield: t.yield || '',
             isHighDemand: t.isHighDemand || false
        }))
    }));

    return { contact, products: mappedProducts };
  } catch (error) {
    console.error('Error reading site data from DB:', error);
    throw new Error('Failed to read site data');
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
    try {
        await db.transaction(async (tx) => {
             // 1. Update Contact
             await tx.insert(config).values({
                 key: 'contact',
                 value: JSON.stringify(data.contact)
             }).onConflictDoUpdate({
                 target: config.key,
                 set: { value: JSON.stringify(data.contact) }
             });

             // 2. Clear existing tables (Full overwrite strategy as requested by previous logic)
             await tx.delete(varieties);
             await tx.delete(subProducts);
             await tx.delete(products);

             // 3. Insert new data
             for (const p of data.products) {
                 await tx.insert(products).values({
                    slug: p.slug,
                    title: p.title,
                    origin: p.origin,
                    description: p.description,
                    detailedDescription: p.detailedDescription,
                    image: p.image,
                    climate: p.climate,
                    growingSeason: p.growingSeason,
                    yield: p.yield,
                    isHighDemand: p.isHighDemand
                 });

                 if (p.varieties && p.varieties.length > 0) {
                     await tx.insert(varieties).values(
                         p.varieties.map(v => ({
                             productSlug: p.slug,
                             name: v
                         }))
                     );
                 }

                 if (p.types && p.types.length > 0) {
                     await tx.insert(subProducts).values(
                         p.types.map(t => ({
                             slug: t.slug,
                             parentSlug: p.slug,
                             title: t.title,
                             origin: t.origin,
                             description: t.description,
                             detailedDescription: t.detailedDescription,
                             image: t.image,
                             climate: t.climate,
                             growingSeason: t.growingSeason,
                             yield: t.yield,
                             isHighDemand: t.isHighDemand
                         }))
                     );
                 }
             }
        });
    } catch (error) {
        console.error('Error saving site data to DB:', error);
        throw new Error('Failed to save site data');
    }
}

