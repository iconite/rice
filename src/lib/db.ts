
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'rice.db');

// Singleton pattern for Next.js hot reloading
declare global {
  var sqliteDb: Database.Database | undefined;
}

let db: Database.Database;

if (process.env.NODE_ENV === 'production') {
  db = new Database(DB_PATH);
} else {
  if (!global.sqliteDb) {
    global.sqliteDb = new Database(DB_PATH);
  }
  db = global.sqliteDb;
}

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize Schema
const initDb = () => {
    // Config table for contact info
    db.exec(`
        CREATE TABLE IF NOT EXISTS config (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    `);

    // Products table
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            slug TEXT PRIMARY KEY,
            title TEXT,
            origin TEXT,
            description TEXT,
            detailedDescription TEXT,
            image TEXT,
            climate TEXT,
            growingSeason TEXT,
            yield TEXT,
            isHighDemand INTEGER DEFAULT 0
        )
    `);

    // Sub Products (Types)
    db.exec(`
        CREATE TABLE IF NOT EXISTS sub_products (
            slug TEXT PRIMARY KEY,
            parent_slug TEXT,
            title TEXT,
            origin TEXT,
            description TEXT,
            detailedDescription TEXT,
            image TEXT,
            climate TEXT,
            growingSeason TEXT,
            yield TEXT,
            isHighDemand INTEGER DEFAULT 0,
            FOREIGN KEY(parent_slug) REFERENCES products(slug) ON DELETE CASCADE
        )
    `);

    // Migration for existing tables (safe to run always)
    try {
        db.exec("ALTER TABLE products ADD COLUMN isHighDemand INTEGER DEFAULT 0");
    } catch (e) { /* Ignore if exists */ }
    
    try {
        db.exec("ALTER TABLE sub_products ADD COLUMN isHighDemand INTEGER DEFAULT 0");
    } catch (e) { /* Ignore if exists */ }

    // Varieties
    db.exec(`
        CREATE TABLE IF NOT EXISTS varieties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_slug TEXT,
            name TEXT,
            FOREIGN KEY(product_slug) REFERENCES products(slug) ON DELETE CASCADE
        )
    `);
    // Users
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password_hash TEXT
        )
    `);
};

// Seed default admin
const seedAdmin = () => {
    const userCount = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };
    if (userCount.count === 0) {
        console.log('Seeding default admin user...');
        const hash = require('bcryptjs').hashSync('admin123', 10);
        db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('admin', hash);
        console.log('Default admin created: admin / admin123');
    }
};

// Simple migration check: if products empty, check for json seed
const seedFromJSON = () => {
    // Check if tables are effectively empty
    const row = db.prepare('SELECT count(*) as count FROM products').get() as { count: number };
    if (row.count === 0) {
        const jsonPath = path.join(process.cwd(), 'src/data/site-data.json');
        if (fs.existsSync(jsonPath)) {
            console.log('Seeding database from site-data.json...');
            const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
            
            const insertConfig = db.prepare('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)');
            insertConfig.run('contact', JSON.stringify(jsonData.contact));

            const insertProduct = db.prepare(`
                INSERT INTO products (slug, title, origin, description, detailedDescription, image, climate, growingSeason, yield)
                VALUES (@slug, @title, @origin, @description, @detailedDescription, @image, @climate, @growingSeason, @yield)
            `);
            
            const insertSubProduct = db.prepare(`
                INSERT INTO sub_products (slug, parent_slug, title, origin, description, detailedDescription, image, climate, growingSeason, yield)
                VALUES (@slug, @parent_slug, @title, @origin, @description, @detailedDescription, @image, @climate, @growingSeason, @yield)
            `);

            const insertVariety = db.prepare('INSERT INTO varieties (product_slug, name) VALUES (?, ?)');

            const insertMany = db.transaction((products: any[]) => {
                for (const p of products) {
                    // Ensure slug exists
                    const pSlug = p.slug || p.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
                    
                    insertProduct.run({
                        slug: pSlug,
                        title: p.title,
                        origin: p.origin,
                        description: p.description,
                        detailedDescription: p.detailedDescription || null,
                        image: p.image,
                        climate: p.climate || null,
                        growingSeason: p.growingSeason || null,
                        yield: p.yield || null
                    });

                    if (p.varieties && Array.isArray(p.varieties)) {
                        for (const v of p.varieties) {
                            insertVariety.run(pSlug, v);
                        }
                    }

                    if (p.types && Array.isArray(p.types)) {
                        for (const t of p.types) {
                            const tSlug = t.slug || `${pSlug}-${t.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')}`;
                            insertSubProduct.run({
                                slug: tSlug,
                                parent_slug: pSlug,
                                title: t.title,
                                origin: t.origin,
                                description: t.description,
                                detailedDescription: t.detailedDescription || null,
                                image: t.image,
                                climate: t.climate || null,
                                growingSeason: t.growingSeason || null,
                                yield: t.yield || null
                            });
                        }
                    }
                }
            });

            insertMany(jsonData.products);
            console.log('Seeding complete.');
        }
    }
};

initDb();
seedAdmin();
seedFromJSON();

export default db;
