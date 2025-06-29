import type { PetType } from '~/src/renderer/screens/pet/constants/pet'

export interface Store {
	configs: StoreConfigs
	auth: StoreAuth | null
}

export interface StoreAuth {
	accessToken: string
	email: string
	userId: string
}

export interface StoreConfigs {
	general: {
		/**
		 * First time user is using the app
		 */
		firstRun: boolean
		/**
		 * Interval between each request to the AI
		 */
		cursingInterval: number
		/**
		 * If true, the AI will not say bad words
		 */
		safeMode: boolean
		/**
		 * If true, the AI will be in focus mode
		 */
		focusMode: {
			job: string
		} | null
	}
	appearance: {
		selectedPet: PetType
	}
}
