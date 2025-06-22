import { useRef } from 'react'
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
			<div
				className="absolute bottom-0"
				style={{
					left: `${position}px`,
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
			</div>
		</div>
	)
}
