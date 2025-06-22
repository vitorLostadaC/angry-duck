import { useEffect, useRef, useState } from 'react'
import { MESSAGE_DURATION } from '../constants/chat'
import { MESSAGES } from '../constants/messages'

interface PetChatCallbacks {
	enabled: boolean
	onMessageShow?: () => void
	onMessageHide?: () => void
}

const MESSAGE_INTERVAL = 25 * 1000 // 25 seconds

export const usePetChat = ({
	enabled,
	onMessageShow,
	onMessageHide
}: PetChatCallbacks): {
	message: string
} => {
	const [message, setMessage] = useState('')

	const chatTimerRef = useRef<NodeJS.Timeout | null>(null)
	const messageIntervalRef = useRef<NodeJS.Timeout | null>(null)

	const currentIndexMessageRef = useRef(0)

	const showMessage = (message: string) => {
		onMessageShow?.()
		setMessage(message)

		chatTimerRef.current = setTimeout(() => {
			onMessageHide?.()
			setMessage('')
			scheduleNextMessage()
		}, MESSAGE_DURATION)
	}

	const scheduleNextMessage = async () => {
		messageIntervalRef.current = setTimeout(async () => {
			showMessage(MESSAGES[currentIndexMessageRef.current % MESSAGES.length])
			currentIndexMessageRef.current++
		}, MESSAGE_INTERVAL)
	}

	function clearTimersAndSetups() {
		setMessage('')
		if (chatTimerRef.current) clearTimeout(chatTimerRef.current)
		if (messageIntervalRef.current) clearTimeout(messageIntervalRef.current)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: this should be called only once
	useEffect(() => {
		scheduleNextMessage()

		return () => {
			clearTimersAndSetups()
		}
	}, [enabled])

	return { message }
}
