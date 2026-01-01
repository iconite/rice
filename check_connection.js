
const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

const url = process.env.DATABASE_URL;

if (!url) {
    console.error("DATABASE_URL is missing from .env.local");
    process.exit(1);
}

console.log("DATABASE_URL found (length: " + url.length + ")");
console.log("Starts with: " + url.substring(0, 15) + "...");

async function check() {
    const sql = postgres(url, { max: 1 });
    try {
        const result = await sql`SELECT 1 as val`;
        console.log("Connection successful:", result);
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await sql.end();
    }
}

check();
