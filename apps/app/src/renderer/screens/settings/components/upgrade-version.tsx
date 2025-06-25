import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '~/src/renderer/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '~/src/renderer/components/ui/dialog'
import { getLatestVersion } from '~/src/renderer/lib/get-latest-version'

export const UpgradeVersion = () => {
	const [params] = useSearchParams()
	const [isOpen, setIsOpen] = useState(false)

	const currentAppVersion = params.get('version')
	const { data: latestVersion, isPending: isPendingLatestVersion } = useQuery({
		queryKey: ['latestVersion'],
		queryFn: async () => await getLatestVersion()
	})

	useEffect(() => {
		if (isPendingLatestVersion || !latestVersion) return

		if (currentAppVersion !== latestVersion) setIsOpen(true)
	}, [isPendingLatestVersion, params])

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova versão disponível → {latestVersion}</DialogTitle>
					<DialogDescription>
						{latestVersion} - {currentAppVersion}
						Atualize assim que possível, para ter a pior experiência possível.
					</DialogDescription>
				</DialogHeader>
				<Button onClick={() => window.open('https://patoputo.com', '_blank')}>Atualizar</Button>
			</DialogContent>
		</Dialog>
	)
}
