import { z } from 'zod'

export const userCodeSchema = z.object({
	code: z.string(),
	createdAt: z.string(),
	email: z.string().email()
})

export type UserCode = z.infer<typeof userCodeSchema>
