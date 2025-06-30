import type { GetCodeRequest, GetCodeResponse } from '@repo/api-types/authentication.dto'
import { api } from '~/src/renderer/lib/api'

export const getCode = async ({ email }: GetCodeRequest): Promise<GetCodeResponse> =>
	api.post('/auth/get-code', { email })
