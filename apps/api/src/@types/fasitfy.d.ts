import type { UserJWT } from '@repo/api-types/user.schema'

declare module 'fastify' {
	interface FastifyRequest {
		user: UserJWT
	}
}
