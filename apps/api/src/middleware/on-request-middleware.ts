import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '../env'
import { validateJWT } from '../lib/validate-jwt'

export const onRequestMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
	const url = request.url
	const isPublicRoute = url.includes('/webhook') || url.includes('/auth')

	const adminHeader = request.headers['x-admin']
	const isDevAdmin = adminHeader === 'dev' && env.NODE_ENV === 'development'

	if (isPublicRoute || isDevAdmin) {
		return
	}

	const token = request.headers.authorization?.split(' ')[1] ?? ''

	const decoded = validateJWT(token)

	if (!decoded) {
		reply.code(401).send({ error: 'Unauthorized' })
		return reply
	}

	request.user = decoded
}
