import { db } from './db';
import { config, products, subProducts, varieties } from './schema';
import { Product, ProductType } from './products';
import { eq } from 'drizzle-orm';
import { unstable_noStore as noStore } from 'next/cache';

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
  noStore();

  try {
    // Sequential execution to be safer
    const contactRows = await db.select().from(config).where(eq(config.key, 'contact')).limit(1);
    const productsData = await db.select().from(products);
    const varietiesData = await db.select().from(varieties);
    const subProductsData = await db.select().from(subProducts);
    
    // Process Contact
    let contact;
    try {
      const rawValue = contactRows[0]?.value;
      // Guard against corrupted data or empty values
      if (rawValue && rawValue !== '[object Object]') {
         contact = typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
      } else {
        throw new Error("Invalid or corrupted contact data");
      }
    } catch (e) {
      console.warn("Recovering from contact data error:", e);
      contact = {
        email: '',
        phone: '',
        address: '',
        whatsapp: ''
      };
    }

    // Hydrate Products with Relations (In-Memory Join)
    const productsWithRelations: Product[] = productsData.map(p => {
      // Get Varieties for this product
      const pVarieties = varietiesData
        .filter(v => v.productSlug === p.slug)
        .map(v => v.name || '');

      // Get Types (Sub Products) for this product
      const pTypes = subProductsData
        .filter(t => t.parentSlug === p.slug)
        .map(t => ({
          slug: t.slug || '',
          title: t.title || '',
          origin: t.origin || '',
          description: t.description || '',
          detailedDescription: t.detailedDescription || undefined,
          image: t.image || '',
          climate: t.climate || undefined,
          growingSeason: t.growingSeason || undefined,
          yield: t.yield || undefined,
          isHighDemand: Boolean(t.isHighDemand),
        }));

      return {
        slug: p.slug || '',
        title: p.title || '',
        origin: p.origin || '',
        description: p.description || '',
        detailedDescription: p.detailedDescription || undefined,
        image: p.image || '',
        climate: p.climate || undefined,
        growingSeason: p.growingSeason || undefined,
        yield: p.yield || undefined,
        isHighDemand: Boolean(p.isHighDemand),
        varieties: pVarieties,
        types: pTypes,
      };
    });

    return { contact, products: productsWithRelations };
  } catch (error) {
    console.error('Error reading site data from DB:', error);
    throw new Error('Failed to read site data');
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
  try {
    // 1. Update Contact
    const existingContact = await db.select().from(config).where(eq(config.key, 'contact')).limit(1);
    
    if (existingContact.length > 0) {
       await db.update(config)
        .set({ value: JSON.stringify(data.contact) })
        .where(eq(config.key, 'contact'));
    } else {
       await db.insert(config)
        .values({ key: 'contact', value: JSON.stringify(data.contact) });
    }

    // 2. Clear existing tables (Full overwrite strategy)
    await db.delete(varieties);
    await db.delete(subProducts);
    await db.delete(products);

    // 3. Insert new data
    for (const p of data.products) {
      // Insert product
      await db.insert(products).values({
        slug: p.slug,
        title: p.title,
        origin: p.origin,
        description: p.description,
        detailedDescription: p.detailedDescription || null,
        image: p.image,
        climate: p.climate || null,
        growingSeason: p.growingSeason || null,
        yield: p.yield || null,
        isHighDemand: p.isHighDemand ? 1 : 0
      });

      // Insert varieties
      if (p.varieties && Array.isArray(p.varieties)) {
        for (const v of p.varieties) {
          await db.insert(varieties).values({
            productSlug: p.slug,
            name: v
          });
        }
      }

      // Insert sub products (types)
      if (p.types && Array.isArray(p.types)) {
        for (const t of p.types) {
          await db.insert(subProducts).values({
            slug: t.slug,
            parentSlug: p.slug,
            title: t.title,
            origin: t.origin,
            description: t.description,
            detailedDescription: t.detailedDescription || null,
            image: t.image,
            climate: t.climate || null,
            growingSeason: t.growingSeason || null,
            yield: t.yield || null,
            isHighDemand: t.isHighDemand ? 1 : 0
          });
        }
      }
    }
  } catch (error) {
    console.error('Error saving site data to DB:', error);
    throw new Error('Failed to save site data');
  }
}
