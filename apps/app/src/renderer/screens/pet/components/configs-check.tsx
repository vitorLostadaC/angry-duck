import { useQuery } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getLatestVersion } from '~/src/renderer/lib/get-latest-version'
import { getStoreOptions } from '~/src/renderer/requests/electron-store/options'

export const ConfigsCheck = memo(() => {
	const [params] = useSearchParams()

	const currentAppVersion = params.get('version')

	const { data: store, isPending: isPendingConfigs } = useQuery(getStoreOptions())
	const { data: latestVersion, isPending: isPendingLatestVersion } = useQuery({
		queryKey: ['latestVersion'],
		queryFn: async () => await getLatestVersion()
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const isLoading = isPendingConfigs || isPendingLatestVersion

		if (isLoading || !store) return

		const isFirstRun = store.configs.general.firstRun
		const thereIsNewVersion = latestVersion !== currentAppVersion

		if (isFirstRun || thereIsNewVersion) {
			window.api.windows.createSettingsWindow()

			if (store.configs.general.firstRun)
				window.api.store.updateStore({
					store: {
						configs: {
							...store.configs,
							general: {
								...store.configs.general,
								firstRun: false
							}
						}
					}
				})
		}
	}, [isPendingConfigs, isPendingLatestVersion])

	return null
})
