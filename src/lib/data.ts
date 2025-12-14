
import db from './db';
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
    const contactRow = db.prepare("SELECT value FROM config WHERE key = 'contact'").get() as { value: string } | undefined;
    const contact = contactRow ? JSON.parse(contactRow.value) : {
      email: '',
      phone: '',
      address: '',
      whatsapp: ''
    };

    // Get Products
    const products = db.prepare('SELECT * FROM products').all().map((p: any) => ({
        ...p,
        isHighDemand: Boolean(p.isHighDemand)
    })) as Product[];

    // Hydrate Products with Relations
    const getVarieties = db.prepare('SELECT name FROM varieties WHERE product_slug = ?');
    const getSubProducts = db.prepare('SELECT * FROM sub_products WHERE parent_slug = ?');

    for (const p of products) {
        // Varieties
        const varietyRows = getVarieties.all(p.slug) as { name: string }[];
        p.varieties = varietyRows.map(v => v.name);

        // Types (Sub Products)
        p.types = getSubProducts.all(p.slug).map((t: any) => ({
             ...t,
             isHighDemand: Boolean(t.isHighDemand)
        })) as ProductType[];
    }

    return { contact, products };
  } catch (error) {
    console.error('Error reading site data from DB:', error);
    throw new Error('Failed to read site data');
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
  const insertProduct = db.prepare(`
        INSERT INTO products (slug, title, origin, description, detailedDescription, image, climate, growingSeason, yield, isHighDemand)
        VALUES (@slug, @title, @origin, @description, @detailedDescription, @image, @climate, @growingSeason, @yield, @isHighDemand)
    `);
    
  const insertSubProduct = db.prepare(`
        INSERT INTO sub_products (slug, parent_slug, title, origin, description, detailedDescription, image, climate, growingSeason, yield, isHighDemand)
        VALUES (@slug, @parent_slug, @title, @origin, @description, @detailedDescription, @image, @climate, @growingSeason, @yield, @isHighDemand)
    `);

  const insertVariety = db.prepare('INSERT INTO varieties (product_slug, name) VALUES (?, ?)');
  const updateContact = db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('contact', ?)");

  const saveTransaction = db.transaction((newData: SiteData) => {
      // 1. Update Contact
      updateContact.run(JSON.stringify(newData.contact));

      // 2. Clear existing tables (Full overwrite strategy)
      db.prepare('DELETE FROM varieties').run();
      db.prepare('DELETE FROM sub_products').run();
      db.prepare('DELETE FROM products').run();

      // 3. Insert new data
      for (const p of newData.products) {
            insertProduct.run({
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

            if (p.varieties && Array.isArray(p.varieties)) {
                for (const v of p.varieties) {
                    insertVariety.run(p.slug, v);
                }
            }

            if (p.types && Array.isArray(p.types)) {
                for (const t of p.types) {
                    insertSubProduct.run({
                        slug: t.slug,
                        parent_slug: p.slug,
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
  });

  try {
    saveTransaction(data);
  } catch (error) {
    console.error('Error saving site data to DB:', error);
    throw new Error('Failed to save site data');
  }
}
