import { useQuery } from '@tanstack/react-query'
import { CoinsIcon, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/src/renderer/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '~/src/renderer/components/ui/dropdown-menu'
import { getStoreOptions } from '~/src/renderer/requests/electron-store/options'
import { getUserOptions } from '~/src/renderer/requests/user/options'
import { useAuth } from '../../../hooks/use-auth'
import { AuthenticateDialog } from '../../authenticate-dialog/authenticate-dialog'
import { FeedbackDialog } from './feedback-dialog'

export function UserProfile() {
	const { updateAuth } = useAuth()
	const [authenticateOpen, setAuthenticateOpen] = useState(false)
	const { data: store } = useQuery(getStoreOptions())

	const { data } = useQuery(getUserOptions(store?.auth?.userId ?? ''))

	if (!store?.auth)
		return (
			<AuthenticateDialog open={authenticateOpen} setOpen={setAuthenticateOpen}>
				<Button className="w-full">Login</Button>
			</AuthenticateDialog>
		)

	const userName = store?.auth?.email.split('@')[0] ?? ''

	return (
		<div className="flex flex-col gap-2">
			<FeedbackDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex flex-col w-40 gap-0.5 bg-gray-900 rounded-lg p-2.5 px-4 select-none cursor-pointer">
						<div className="flex justify-between items-center">
							<span className="text-sm truncate capitalize">{userName}</span>
							<div className="text-sm flex gap-1 items-center">
								<CoinsIcon className="size-4" />
								{data?.credits}
							</div>
						</div>
						<span className="text-gray-300 text-xs truncate">{store?.auth?.email ?? ''}</span>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>{userName}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild className="w-full" onClick={() => updateAuth(null)}>
						<div className="flex items-center gap-2">
							<LogOutIcon className="size-4" /> Sair
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
