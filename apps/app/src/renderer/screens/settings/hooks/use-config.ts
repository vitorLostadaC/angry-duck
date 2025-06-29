import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getStoreOptions } from '~/src/renderer/requests/electron-store/options'
import type { StoreConfigs } from '~/src/shared/types/store'

export const useConfig = () => {
	const queryClient = useQueryClient()
	const { data: store } = useQuery(getStoreOptions())

	const { mutateAsync: updateConfig } = useMutation({
		mutationKey: ['update-config'],
		mutationFn: (configs: Partial<StoreConfigs>) => {
			return window.api.store.updateStore({
				store: { configs: { ...store!.configs, ...configs } }
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

	return { configs: store?.configs, updateConfig }
}
