import type { ConfirmCodeRequest, ConfirmCodeResponse } from '@repo/api-types/authentication.dto'
import { api } from '~/src/renderer/lib/api'

export const confirmCode = async ({
	email,
	code
}: ConfirmCodeRequest): Promise<ConfirmCodeResponse> =>
	api.post('/auth/confirm-code', { email, code })
