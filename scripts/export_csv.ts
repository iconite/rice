
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '..', 'rice.db');
const db = new Database(dbPath, { fileMustExist: true });

const outputDir = path.resolve(__dirname, '..', 'csv_exports');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

function exportTable(tableName: string) {
    try {
        const rows = db.prepare(`SELECT * FROM ${tableName}`).all() as Record<string, any>[];
        if (rows.length === 0) {
            console.log(`Table '${tableName}' is empty.`);
            return;
        }

        const headers = Object.keys(rows[0]).join(',');
        const csvContent = [headers];

        for (const row of rows) {
            const values = Object.values(row).map(v => {
                if (v === null) return '';
                // Escape quotes and wrap in quotes if contains comma or newline
                const s = String(v).replace(/"/g, '""');
                if (s.includes(',') || s.includes('\n') || s.includes('"')) {
                    return `"${s}"`;
                }
                return s;
            });
            csvContent.push(values.join(','));
        }

        const filePath = path.join(outputDir, `${tableName}.csv`);
        fs.writeFileSync(filePath, csvContent.join('\n'));
        console.log(`Exported ${rows.length} rows from '${tableName}' to ${filePath}`);
    } catch (error) {
        console.error(`Error exporting table '${tableName}':`, error);
    }
}

const tables = ['config', 'users', 'products', 'sub_products', 'varieties', 'messages'];

console.log(`Exporting CSVs from ${dbPath} to ${outputDir}...`);

for (const table of tables) {
    exportTable(table);
}

console.log('Done.');
