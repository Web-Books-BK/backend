import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export async function hashPassword(password:string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    return passwordHash
}

export async function matchPassword(hash:string, password:string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
}