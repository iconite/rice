
import bcrypt from 'bcryptjs';
import { db } from './drizzle';
import { users } from './schema';
import { eq } from 'drizzle-orm';

export async function getUser(username: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.username, username)
    });
    return user;
}

export function verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}
