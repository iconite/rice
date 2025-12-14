
import bcrypt from 'bcryptjs';
import db from './db';

export function getUser(username: string) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as { id: number, username: string, password_hash: string } | undefined;
}

export function verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}
