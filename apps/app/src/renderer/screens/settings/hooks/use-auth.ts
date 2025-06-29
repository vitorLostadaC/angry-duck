import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getStoreOptions } from '~/src/renderer/requests/electron-store/options'
import type { StoreAuth } from '~/src/shared/types/store'

export const useAuth = () => {
	const queryClient = useQueryClient()
	const { data: store } = useQuery(getStoreOptions())

	const { mutateAsync: updateAuth } = useMutation({
		mutationKey: ['update-auth'],
		mutationFn: (auth: Partial<StoreAuth>) => {
			return window.api.store.updateStore({
				store: { auth: { ...(store!.auth ?? { accessToken: '', email: '', userId: '' }), ...auth } }
			})
		},
		onSuccess: ({ store }) => {
			queryClient.setQueryData(getStoreOptions().queryKey, (oldData) => {
				if (!oldData) return store

				return {
					...oldData,
					...store
				}
			})
		}
	})

	return { auth: store?.auth, updateAuth }
}
