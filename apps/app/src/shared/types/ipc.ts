import type { Store } from './store'

export interface TakeScreenshotResponse {
	/**
	 * The screenshot of the screen in base64 format
	 */
	screenshot: string | null
}

export interface UpdateStoreRequest {
	store: Partial<Store>
}

export interface UpdateStoreResponse {
	store: Store
}

export interface GetStoreResponse {
	store: Store
}
