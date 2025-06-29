import type { UserJWT } from '@repo/api-types/user.schema'
import jwt from 'jsonwebtoken'
import { env } from '../../../env'
import { AppError } from '../../../helpers/error-handler'
import { updateUser } from '../../../services/mongo/user'
import { deleteUserCodeByEmail, findUserCodeByEmail } from '../../../services/mongo/user-codes'

export class ConfirmCodeUseCase {
	async execute(email: string, code: string) {
		const userCode = await findUserCodeByEmail(email)

		const maxAge = 1000 * 60 * 15 // 15 minutes

		if (
			!userCode ||
			userCode.code !== code ||
			new Date(userCode.createdAt).getTime() < Date.now() - maxAge
		) {
			throw new AppError('Unauthorized', 'Invalid code', 401)
		}

		await Promise.all([
			updateUser(userCode.userId, { actived: true }),
			deleteUserCodeByEmail(email)
		])

		const token = jwt.sign(
			{
				email,
				userId: userCode.userId
			} satisfies UserJWT,
			env.JWT_SECRET,
			{
				expiresIn: '30d'
			}
		)

		return {
			token
		}
	}
}
