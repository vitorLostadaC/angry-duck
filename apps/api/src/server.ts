import dotenv from 'dotenv'
dotenv.config()

import { clerkPlugin, getAuth } from '@clerk/fastify'
import cors from '@fastify/cors'
import Fastify from 'fastify'
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler
} from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './helpers/error-handler'
import { routes } from './route'

const fastify = Fastify({
	logger: {
		enabled: true,
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: false,
				ignore: 'pid,hostname,level,time,reqId'
			}
		}
	},
	bodyLimit: 1024 * 1024 * 10, // 10MB
	disableRequestLogging: true
}).withTypeProvider<ZodTypeProvider>()

fastify.register(clerkPlugin, {
	hookName: 'onRequest'
})

fastify.register(cors, {
	origin: true,
	credentials: true
})

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.addHook('onRequest', async (request, reply) => {
	const url = request.url
	const isPublicRoute = url.includes('/webhook')

	// Allow access for public routes or dev admin header in development
	const adminHeader = request.headers['x-admin']
	const isDevAdmin = adminHeader === 'dev' && env.NODE_ENV === 'development'

	if (isPublicRoute || isDevAdmin) {
		return
	}

	const { userId } = getAuth(request)

	if (!userId) {
		reply.code(401).send({ error: 'Unauthorized' })
		// Stop further processing
		return reply
	}
})

fastify.register(routes)

fastify.setErrorHandler(errorHandler)

fastify.listen({ port: 3333 }, (err) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
