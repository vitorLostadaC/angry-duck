import { type MotionValue, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { Direction, MOVEMENT_SPEED, PET_DIMENSIONS } from '../constants/pet'

interface UsePetMovementProps {
	chatRef: React.RefObject<HTMLDivElement | null>
}

export const usePetMovement = ({
	chatRef
}: UsePetMovementProps): {
	x: MotionValue<number>
	direction: Direction
	chatDirection: Direction
	stopMovement: () => void
	resumeMovement: () => void
} => {
	const x = useMotionValue(0)

	const [direction, setDirection] = useState(Direction.RIGHT)
	const [chatDirection, setChatDirection] = useState(Direction.RIGHT)

	const directionRef = useRef(Direction.RIGHT)
	const chatDirectionRef = useRef(Direction.RIGHT)
	const isMovingRef = useRef(true)

	const getBoundaries = useCallback(() => {
		const maxPosition = window.innerWidth - PET_DIMENSIONS.width
		const chatWidth = chatRef.current?.offsetWidth ?? 256
		return { maxPosition, chatWidth }
	}, [chatRef])

	const getChatDirection = useCallback((position: number, chatWidth: number): Direction => {
		if (position <= chatWidth - PET_DIMENSIONS.width) return Direction.RIGHT
		if (position + chatWidth >= window.innerWidth) return Direction.LEFT
		return chatDirectionRef.current
	}, [])

	useAnimationFrame(() => {
		if (!isMovingRef.current) return

		const { maxPosition, chatWidth } = getBoundaries()
		const nextPosition = x.get() + directionRef.current * MOVEMENT_SPEED

		let nextDirection = directionRef.current

		// Handle screen edges
		if (nextPosition <= 0) nextDirection = Direction.RIGHT
		if (nextPosition >= maxPosition) nextDirection = Direction.LEFT

		// Update MotionValue (cheap)
		x.set(nextPosition)

		// If the walking direction changed, sync refs + React state (rare)
		if (nextDirection !== directionRef.current) {
			directionRef.current = nextDirection
			setDirection(nextDirection)
		}

		// Chat-bubble orientation
		const nextChatDirection = getChatDirection(nextPosition, chatWidth)
		if (nextChatDirection !== chatDirectionRef.current) {
			chatDirectionRef.current = nextChatDirection
			setChatDirection(nextChatDirection)
		}
	})

	const stopMovement = useCallback(() => {
		isMovingRef.current = false
	}, [])

	const resumeMovement = useCallback(() => {
		if (!isMovingRef.current) {
			isMovingRef.current = true
		}
	}, [])

	return { x, direction, chatDirection, stopMovement, resumeMovement }
}
