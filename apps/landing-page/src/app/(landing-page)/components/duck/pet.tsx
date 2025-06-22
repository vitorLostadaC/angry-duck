import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Chat } from './chat'
import { PET_DIMENSIONS, PetState, pets } from './constants/pet'
import { usePetChat } from './hooks/use-pet-chat'
import { usePetMovement } from './hooks/use-pet-movement'

export const PetWalking = (): React.JSX.Element => {
	const currentStateRef = useRef<PetState>(PetState.WALKING)
	const chatRef = useRef<HTMLDivElement>(null)

	const { position, direction, chatDirection, stopMovement, resumeMovement } = usePetMovement({
		chatRef
	})

	const { message } = usePetChat({
		onMessageShow: handleStoppedState,
		onMessageHide: handleWalkingState,
		enabled: true
	})

	useEffect(() => {
		setTimeout(() => {
			resumeMovement()
		}, 1000)
	}, [resumeMovement])

	function handleStoppedState() {
		currentStateRef.current = PetState.STOPPED
		stopMovement()
	}

	function handleWalkingState() {
		currentStateRef.current = PetState.WALKING
		resumeMovement()
	}

	return (
		<div>
			<motion.div
				className="absolute bottom-0"
				initial={{
					left: 0,
					opacity: 0
				}}
				animate={{
					left: `${position}px`,
					opacity: 1,
					transition: {
						opacity: {
							duration: 2,
							delay: 1.5
						}
					}
				}}
				style={{
					width: PET_DIMENSIONS.width,
					height: PET_DIMENSIONS.height
				}}
			>
				<Chat message={message} direction={chatDirection} ref={chatRef} />
				<img
					src={pets.duck[currentStateRef.current]}
					alt="Duck"
					className="w-full h-full object-contain"
					style={{ transform: `scaleX(${direction})` }}
				/>
			</motion.div>
		</div>
	)
}
