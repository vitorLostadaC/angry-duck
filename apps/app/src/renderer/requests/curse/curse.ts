import type { CurseScreenshotRequest, CurseScreenshotResponse } from '@repo/api-types/curse.dto'
import { api } from '~/src/renderer/lib/api'

interface CurseRequest extends CurseScreenshotRequest {
	userId: string
}

export const curse = async ({
	imageBase64,
	config,
	userId
}: CurseRequest): Promise<CurseScreenshotResponse> =>
	api.post(`/curse/screenshot/${userId}`, { imageBase64, config })
