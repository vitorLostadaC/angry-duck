import { queryOptions } from '@tanstack/react-query'

export const getStoreOptions = () =>
	queryOptions({
		queryKey: ['store'],
		queryFn: async () => {
			const response = await window.api.store.getStore()
			return response.store
		}
	})
