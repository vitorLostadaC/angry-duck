import { api } from '@renderer/lib/axios'
import type { GetCodeRequest, GetCodeResponse } from '@repo/api-types/authentication.dto'

export const getCode = async ({ email }: GetCodeRequest): Promise<GetCodeResponse> =>
	api.post('/auth/get-code', { email })
