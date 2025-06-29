import { useMutation, useQuery } from '@tanstack/react-query'
import { CoinsIcon, LogOutIcon } from 'lucide-react'
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
import { FeedbackDialog } from './feedback-dialog'

export function UserProfile() {
	const { data: store } = useQuery(getStoreOptions())
	const { mutate: logout } = useMutation({
		mutationFn: () =>
			window.api.store.updateStore({
				store: {
					auth: null
				}
			})
	})

	const { data } = useQuery(getUserOptions(store?.auth?.userId ?? ''))

	if (!store?.auth) return <Button className="w-full">Login</Button>

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
					<DropdownMenuItem
						asChild
						className="w-full flex items-center gap-2"
						onClick={() => logout()}
					>
						<LogOutIcon className="size-4" /> Sair
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
