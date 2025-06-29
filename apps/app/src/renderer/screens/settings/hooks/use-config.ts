import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Store } from '~/src/shared/types/store'
import { getConfigsOptions } from '../../../requests/electron-store/options'

export const useConfig = () => {
	const queryClient = useQueryClient()
	const { data: configs } = useQuery(getConfigsOptions())

	const { mutateAsync: updateConfig } = useMutation({
		mutationKey: ['update-config'],
		mutationFn: (config: Partial<Store>) => {
			return window.api.config.updateConfig({ config })
		},
		onSuccess: ({ config }) => {
			queryClient.setQueryData(getConfigsOptions().queryKey, (oldData) => {
				if (!oldData) return config

				return {
					...oldData,
					...config
				}
			})
		}
	})

	return { configs, updateConfig }
}
