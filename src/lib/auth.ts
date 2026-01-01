import bcrypt from 'bcryptjs';
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';

export async function getUser(username: string) {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result.length > 0 ? {
        id: result[0].id,
        username: result[0].username || '',
        password_hash: result[0].passwordHash || ''
    } : undefined;
}

export function verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}
