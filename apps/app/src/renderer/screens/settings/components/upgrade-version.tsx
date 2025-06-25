import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Button } from '~/src/renderer/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '~/src/renderer/components/ui/dialog'
import { getLatestVersion } from '~/src/renderer/lib/get-latest-version'
import { version } from '../../../../../package.json'

export const UpgradeVersion = () => {
	const [isOpen, setIsOpen] = useState(false)

	const currentAppVersion = version
	const { data: latestVersion, isPending: isPendingLatestVersion } = useQuery({
		queryKey: ['latestVersion'],
		queryFn: async () => await getLatestVersion()
	})

	useEffect(() => {
		if (isPendingLatestVersion || !latestVersion) return

		if (currentAppVersion !== latestVersion) setIsOpen(true)
	}, [isPendingLatestVersion])

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova versão disponível → {latestVersion} </DialogTitle>
					<DialogDescription>
						Atualize assim que possível, para ter a pior experiência possível.
					</DialogDescription>
				</DialogHeader>
				<Button onClick={() => window.open('https://patoputo.com', '_blank')}>Atualizar</Button>
			</DialogContent>
		</Dialog>
	)
}
