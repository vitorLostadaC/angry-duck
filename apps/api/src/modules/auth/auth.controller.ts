import { z } from 'zod'
import type { FastifyTypedInstance } from '../../types/fastify'
import { AuthenticateUseCase } from './use-cases/authenticate-use-case'
import { ConfirmCodeUseCase } from './use-cases/cofirm-code-use-case'

const authenticateUseCase = new AuthenticateUseCase()
const confirmCodeUseCase = new ConfirmCodeUseCase()

export async function authRoutes(fastify: FastifyTypedInstance) {
	fastify.get(
		'/auth',
		{
			schema: {
				body: z.object({
					email: z.string().email()
				})
			}
		},
		async (request, reply) => {
			const { email } = request.body

			const result = await authenticateUseCase.execute(email)

			return reply.status(200).send(result)
		}
	)
	fastify.post(
		'/auth/confirm-code',
		{
			schema: {
				body: z.object({
					email: z.string().email(),
					code: z.string()
				})
			}
		},
		async (request, reply) => {
			const { email, code } = request.body

			const result = await confirmCodeUseCase.execute(email, code)

			return reply.status(200).send(result)
		}
	)
}
