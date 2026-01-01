
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = "postgresql://postgres.ryvdkgkkqekebhayogiz:IconiteEarth18@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
