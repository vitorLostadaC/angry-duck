import type { FastifyReply, FastifyRequest } from 'fastify'
import { env } from '../env'
import { AppError } from '../helpers/error-handler'
import { validateJWT } from '../lib/validate-jwt'

const publicRoutes = ['/webhook', '/auth', '/health']

export const onRequestMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
	const url = request.url

	console.log(url)

	const isPublicRoute = publicRoutes.some((route) => url.includes(route))

	const adminHeader = request.headers['x-admin']
	const isDevAdmin = adminHeader === 'dev' && env.NODE_ENV === 'development'

	if (isPublicRoute || isDevAdmin) {
		return
	}

	const token = request.headers.authorization?.split(' ')[1] ?? ''

	const decoded = validateJWT(token)

	if (!decoded) {
		throw new AppError('Unauthorized', 'Invalid token', 401)
	}

	request.user = decoded
}
