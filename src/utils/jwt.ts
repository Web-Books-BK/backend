import * as jwt from 'jsonwebtoken'
import { UserJWT } from '../types/userJWT'

function sign(user: UserJWT): string {
    const JWT_SECRET = 'qemsaslvjd-33r3:9i9vis3.'
    return jwt.sign({
        id: user.id,
        username: user.userName,
        email: user.email,
    }, JWT_SECRET, {
        expiresIn: '2 days',
    });
}

function decode(token:string): (jwt.JwtPayload | string) {
    const JWT_SECRET = 'qemsaslvjd-33r3:9i9vis3.'
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
} 
// module.exports.sign = 

export {sign, decode}