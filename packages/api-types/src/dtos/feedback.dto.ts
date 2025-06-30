import { z } from 'zod'
import { ratingSchema } from '../schemas/feedback.js'

export const createFeedbackDtoSchema = z.object({
	message: z.string(),
	rating: ratingSchema,
	os: z.string()
})

export type CreateFeedbackDto = z.infer<typeof createFeedbackDtoSchema>
