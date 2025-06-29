import type { UserJWT } from '@repo/api-types/user.schema'
import jwt from 'jsonwebtoken'
import { env } from '../env'

export const validateJWT = (token: string) => {
	const decoded = jwt.verify(token, env.JWT_SECRET) as UserJWT & { exp: number }

	const now = Date.now() / 1000

	if (decoded.exp < now) {
		return null
	}

	return decoded
}
