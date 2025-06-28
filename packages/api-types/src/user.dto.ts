import z from 'zod'

export const userSchema = z.object({
	email: z.string().email(),
	credits: z.number().default(3),
	createdAt: z.string()
})

export type User = z.infer<typeof userSchema>
