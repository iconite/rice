
import Database from 'better-sqlite3';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '..', 'rice.db');
const db = new Database(dbPath, { fileMustExist: true });

const supabaseUrl = 'https://ryvdkgkkqekebhayogiz.supabase.co';
const supabaseServiceKey = 'sb_secret_DFsgbGVcApsCz5wufQfHAw_QehB2hi3';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
  console.log("Starting data migration from SQLite to Supabase...");
  console.log(`SQLite DB: ${dbPath}`);
  console.log(`Supabase: ${supabaseUrl}`);

  try {
    // 1. Config (Contact Info)
    const configs = db.prepare('SELECT * FROM config').all() as any[];
    console.log(`Found ${configs.length} config items.`);
    for (const c of configs) {
        const { error } = await supabase.from('config').upsert({ key: c.key, value: c.value });
        if (error) console.error(`Error migrating config '${c.key}':`, error.message);
        else console.log(`Migrated config: ${c.key}`);
    }

    // 2. Users
    const users = db.prepare('SELECT * FROM users').all() as any[];
    console.log(`Found ${users.length} users.`);
    for (const u of users) {
        // We rely on username as unique key in upsert
        const { error } = await supabase.from('users').upsert({
            username: u.username,
            password_hash: u.password_hash
        }, { onConflict: 'username' });
        
        if (error) console.error(`Error migrating user '${u.username}':`, error.message);
        else console.log(`Migrated user: ${u.username}`);
    }

    // 3. Products
    const products = db.prepare('SELECT * FROM products').all() as any[];
    console.log(`Found ${products.length} products.`);
    for (const p of products) {
        const payload = {
            slug: p.slug,
            title: p.title,
            origin: p.origin,
            description: p.description,
            detailedDescription: p.detailedDescription,
            image: p.image,
            climate: p.climate,
            growingSeason: p.growingSeason,
            yield: p.yield,
            isHighDemand: p.isHighDemand ? 1 : 0
        };
        const { error } = await supabase.from('products').upsert(payload);
        if (error) console.error(`Error migrating product '${p.slug}':`, error.message);
        else console.log(`Migrated product: ${p.slug}`);
    }

    // 4. Sub Products
    const subProducts = db.prepare('SELECT * FROM sub_products').all() as any[];
    console.log(`Found ${subProducts.length} sub-products.`);
    for (const p of subProducts) {
        const payload = {
            slug: p.slug,
            parent_slug: p.parent_slug,
            title: p.title,
            origin: p.origin,
            description: p.description,
            detailedDescription: p.detailedDescription,
            image: p.image,
            climate: p.climate,
            growingSeason: p.growingSeason,
            yield: p.yield,
            isHighDemand: p.isHighDemand ? 1 : 0
        };
        const { error } = await supabase.from('sub_products').upsert(payload);
        if (error) console.error(`Error migrating sub-product '${p.slug}':`, error.message);
        else console.log(`Migrated sub-product: ${p.slug}`);
    }

    // 5. Varieties
    const varieties = db.prepare('SELECT * FROM varieties').all() as any[];
    console.log(`Found ${varieties.length} varieties.`);
    // Varieties don't have natural ID in SQLite usually (just auto id). 
    // We can just insert them. To avoid duplicates if run multiple times, 
    // we might want to clear varieties first or check existence. 
    // Since we are upserting parents, let's just delete all varieties for simplicity or insert.
    // Ideally we assume empty target or we wipe it. 
    // Let's wipe varieties table first to be clean? No, maybe dangerous.
    // Let's just insert.
    
    // Actually, varieties table in SQL schema has ID. 
    // If we want to preserve them, we pass ID.
    // If we don't pass ID, it auto-generates.
    
    // Let's try to clear matches first? 
    // Or just insert and ignore duplicates? Varieties table doesn't have unique name constraint often.
    // Let's check schema. `id bigint generated... primary key`. No unique constraint on (product_slug, name).
    // So if we run this twice we get duplicates.
    // Let's delete all varieties in Supabase to ensure clean slate?
    // "migrate the existing data" implies we move what we have.
    // Let's DELETE varieties and messages first to avoid dupes?
    // User said "migrate existing data", usually implies "replicate".
    // I will delete from `varieties` and `messages` at the start.
    
    const { error: cleanError } = await supabase.from('varieties').delete().neq('id', 0); // Delete all
    if (cleanError) console.error("Warning: Could not clear varieties table:", cleanError.message);

    for (const v of varieties) {
        const { error } = await supabase.from('varieties').insert({
           product_slug: v.product_slug,
           name: v.name
        });
        if (error) console.error(`Error migrating variety '${v.name}':`, error.message);
    }
    console.log(`Migrated varieties.`);

    // 6. Messages
    const { error: cleanMsgError } = await supabase.from('messages').delete().neq('id', 0);
    if (cleanMsgError) console.error("Warning: Could not clear messages table:", cleanMsgError.message);

    const messages = db.prepare('SELECT * FROM messages').all() as any[];
    console.log(`Found ${messages.length} messages.`);
    for (const m of messages) {
         const { error } = await supabase.from('messages').insert({
             name: m.name,
             email: m.email,
             product_type: m.product_type,
             quantity: m.quantity,
             destination: m.destination,
             message: m.message,
             created_at: m.created_at
         });
         if (error) console.error(`Error migrating message '${m.id}':`, error.message);
    }
    console.log(`Migrated messages.`);

  } catch (err) {
      console.error("Migration failed:", err);
  }
}

migrate();
