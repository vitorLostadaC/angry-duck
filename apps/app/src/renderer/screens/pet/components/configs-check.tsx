import { useQuery } from '@tanstack/react-query'
import { memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getLatestVersion } from '~/src/renderer/lib/get-latest-version'
import { getConfigsOptions } from '~/src/renderer/requests/electron-store/config'

export const ConfigsCheck = memo(() => {
	const [params] = useSearchParams()

	const currentAppVersion = params.get('version')

	const { data: configs, isPending: isPendingConfigs } = useQuery(getConfigsOptions())
	const { data: latestVersion, isPending: isPendingLatestVersion } = useQuery({
		queryKey: ['latestVersion'],
		queryFn: async () => await getLatestVersion()
	})

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isPendingConfigs || isPendingLatestVersion || !configs) return

		if (configs.general.firstRun || latestVersion !== currentAppVersion) {
			window.api.windows.createSettingsWindow()
			if (configs.general.firstRun)
				window.api.config.updateConfig({
					config: {
						...configs,
						general: {
							...configs.general,
							firstRun: false
						}
					}
				})
		}
	}, [isPendingConfigs, isPendingLatestVersion])

	return null
})
