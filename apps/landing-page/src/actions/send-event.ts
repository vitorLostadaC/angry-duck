'use server'

import { client } from '@/services/posthog'
import { cookies } from 'next/headers'

export const captureEvent = async (event: string, properties?: Record<string, unknown>) => {
	const cookieStore = await cookies()
	let distinctId = cookieStore.get('distinct_id')?.value

	if (!distinctId) {
		distinctId = crypto.randomUUID()
		cookieStore.set('distinct_id', distinctId)
	}

	client.capture({
		event,
		distinctId,
		properties
	})
}
