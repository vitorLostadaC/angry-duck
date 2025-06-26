import { env } from '@/env'
import { PostHog } from 'posthog-node'

export const client = new PostHog(env.POSTHOG_API_KEY, {
	host: 'https://us.i.posthog.com'
})
