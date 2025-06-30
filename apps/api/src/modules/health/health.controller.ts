import type { FastifyTypedInstance } from '../../types/fastify'

export async function healthRoutes(fastify: FastifyTypedInstance) {
	fastify.get('/', async (_, reply) => {
		return reply.status(200).send({ message: 'OK' })
	})
}
