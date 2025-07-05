import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { catchError } from '~/src/renderer/lib/utils'
import { curse } from '~/src/renderer/requests/curse/curse'
import { getStoreOptions } from '~/src/renderer/requests/electron-store/options'
import { getAllPaymentsOptions } from '~/src/renderer/requests/payments/options'
import { getUserOptions } from '~/src/renderer/requests/user/options'
import { MESSAGE_DURATION } from '../constants/chat'

interface PetChatCallbacks {
	enabled: boolean
	onMessageShow?: () => void
	onMessageHide?: () => void
	onTakingScreenshot?: () => void
}

export const usePetChat = ({
	enabled,
	onMessageShow,
	onMessageHide,
	onTakingScreenshot
}: PetChatCallbacks): {
	message: string
} => {
	const { data: store } = useQuery(getStoreOptions())
	const queryClient = useQueryClient()
	const [message, setMessage] = useState('')

	const chatTimerRef = useRef<NodeJS.Timeout | null>(null)
	const messageIntervalRef = useRef<NodeJS.Timeout | null>(null)

	const { data: payments } = useQuery(getAllPaymentsOptions(store?.auth?.userId ?? ''))

	const updatedStates = useRef({
		store,
		payments
	})

	const { mutateAsync: curseMutation } = useMutation({
		mutationFn: curse,
		mutationKey: ['curse'],
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(getUserOptions(variables.userId))
		}
	})

	useEffect(() => {
		updatedStates.current.store = store
		updatedStates.current.payments = payments
	}, [store, payments])

	const showMessage = (message: string) => {
		onMessageShow?.()
		setMessage(message)

		chatTimerRef.current = setTimeout(() => {
			onMessageHide?.()
			setMessage('')
			scheduleNextMessage()
		}, MESSAGE_DURATION)
	}

	const requestCurse = async () => {
		console.log('requestCurse')
		onTakingScreenshot?.()
		const updatedValues = updatedStates.current

		if (!updatedValues.store?.auth) {
			showMessage(
				'Você precisa estar logado, né cabeção. Clica no ícone na sua barra de ferramentas'
			)
			return
		}

		const [error, base64] = await catchError(window.api.actions.takeScreenshot())

		if (error || !base64.screenshot) {
			showMessage('Deu erro pra eu ver a tua tela aqui, me dá permissão por$a!')
			return
		}

		const [errorCurse, curseResponse] = await catchError(
			curseMutation({
				imageBase64: base64.screenshot,
				config: {
					safeMode: updatedValues.store.configs.general.safeMode
				},
				userId: updatedValues.store.auth.userId ?? ''
			})
		)

		if (errorCurse) {
			if (errorCurse.message === 'Insufficient credits') {
				const isPaidUser = !!updatedValues.payments?.find((payment) => payment.status === 'paid')

				if (isPaidUser) {
					showMessage(
						'Jovem, passamos momentos lindos, mas infelizmente nada dura para sempre. E o dinheiro acabou...'
					)
					return
				}

				showMessage('É amigo, parece que os créditos gratuitos acabaram, ou paga ou tchau...')
				return
			}

			showMessage(
				'Meu amigo, parece que algo quebrou, e algo grande... Se isso continuar por muito tempo, pode mandar um xingamento na aba de feedback, porque o dev que fez isso tá de sacanagem.'
			)
			return
		}

		showMessage(curseResponse.message)
	}

	const scheduleNextMessage = async () => {
		const updatedValues = updatedStates.current

		messageIntervalRef.current = setTimeout(async () => {
			requestCurse()
		}, updatedValues.store!.configs.general.cursingInterval * 1000)
	}

	function clearTimersAndSetups() {
		setMessage('')
		if (chatTimerRef.current) clearTimeout(chatTimerRef.current)
		if (messageIntervalRef.current) clearTimeout(messageIntervalRef.current)
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: this should be called only once
	useEffect(() => {
		if (!store || !enabled) {
			console.log('clearTimersAndSetups via useEffect')
			clearTimersAndSetups()
			return
		}
		console.log('scheduleNextMessage')

		scheduleNextMessage()

		return () => {
			clearTimersAndSetups()
		}
	}, [!!store, enabled])

	return { message }
}
