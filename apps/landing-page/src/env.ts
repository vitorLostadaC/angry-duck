import { z } from 'zod'

export const envSchema = z.object({
	POSTHOG_API_KEY: z.string()
})

export const env = envSchema.parse(process.env)
