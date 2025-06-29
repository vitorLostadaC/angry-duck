import z from 'zod'

export const getCodeSchema = z.object({
	email: z.string().email()
})

export const confirmCodeSchema = z.object({
	email: z.string().email(),
	code: z.string()
})

export const getCodeResponseSchema = z.object({
	success: z.boolean()
})

export const confirmCodeResponseSchema = z.object({
	token: z.string()
})

export type GetCodeResponse = z.infer<typeof getCodeResponseSchema>
export type ConfirmCodeResponse = z.infer<typeof confirmCodeResponseSchema>
export type GetCodeRequest = z.infer<typeof getCodeSchema>
export type ConfirmCodeRequest = z.infer<typeof confirmCodeSchema>
