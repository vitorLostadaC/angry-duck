import dotenv from 'dotenv'
dotenv.config()

import cors from '@fastify/cors'
import Fastify from 'fastify'
import {
	type ZodTypeProvider,
	serializerCompiler,
	validatorCompiler
} from 'fastify-type-provider-zod'
import { errorHandler } from './helpers/error-handler'
import { onRequestMiddleware } from './middleware/on-request-middleware'
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

fastify.register(cors, {
	origin: true,
	credentials: true
})

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.addHook('onRequest', onRequestMiddleware)

fastify.register(routes)

fastify.setErrorHandler(errorHandler)

fastify.listen({ port: 3333 }, (err) => {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
})
