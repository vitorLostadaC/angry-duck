import duckStopped from '../../../assets/duck/duck-stopped.png'
import duckWalking from '../../../assets/duck/duck-walking.gif'

export const MOVEMENT_SPEED = 0.5

export enum PetState {
	WALKING = 'walking',
	PRINTING = 'printing',
	STOPPED = 'stopped'
}

export enum Direction {
	LEFT = -1,
	RIGHT = 1
}

export const PET_DIMENSIONS = {
	width: 64,
	height: 64
}

export const pets: Record<'duck', Record<PetState, string>> = {
	duck: {
		[PetState.WALKING]: duckWalking.src,
		[PetState.STOPPED]: duckStopped.src,
		[PetState.PRINTING]: duckWalking.src
	}
}
