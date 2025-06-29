import z from 'zod'

export const userSchema = z.object({
	email: z.string().email(),
	credits: z.number(),
	createdAt: z.string(),
	actived: z.boolean()
})

export const userCodeSchema = z.object({
	code: z.string(),
	userId: z.string(),
	createdAt: z.string(),
	email: z.string().email()
})

export const userJWT = z.object({
	email: z.string().email(),
	userId: z.string()
})

export type User = z.infer<typeof userSchema>
export type UserCode = z.infer<typeof userCodeSchema>
export type UserJWT = z.infer<typeof userJWT>
