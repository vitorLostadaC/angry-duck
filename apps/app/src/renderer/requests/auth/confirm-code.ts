import { api } from '@renderer/lib/axios'
import type { ConfirmCodeRequest, ConfirmCodeResponse } from '@repo/api-types/authentication.dto'

export const confirmCode = async ({
	email,
	code
}: ConfirmCodeRequest): Promise<ConfirmCodeResponse> =>
	api.post('/auth/confirm-code', { email, code })
