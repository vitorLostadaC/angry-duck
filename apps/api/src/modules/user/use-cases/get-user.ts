import { AppError } from '../../../helpers/error-handler'
import { findUserById } from '../../../services/mongo/user'

export class GetUserUseCase {
	async execute(userId: string) {
		const user = await findUserById(userId)

		if (!user) {
			throw new AppError('User not found', 'User not found', 404)
		}

		return user
	}
}
