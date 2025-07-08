import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'

interface MacSignDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function MacSignDialog({ open, onOpenChange }: MacSignDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Como abrir no mac</DialogTitle>
					<DialogDescription className="space-y-2">
						<p>
							Quando você abrir o aplicativo no Mac, vai aparecer uma mensagem falando que o app
							está corrompido, mas é MENTIRA!
						</p>
						<p>
							Eu tenho que{' '}
							<a
								href="https://www.electronjs.org/docs/latest/tutorial/code-signing"
								target="_blank"
								rel="noopener noreferrer"
								className="underline text-tangerine-500"
							>
								assinar
							</a>{' '}
							o app com a licença da Apple de 500 reais, mercenários...
						</p>
						<p>
							Para resolver, é só abrir o Terminal do seu Mac, colar o comando abaixo e pressionar
							Enter.
						</p>
						<p>Depois disso, correr pro abraço.</p>
					</DialogDescription>
				</DialogHeader>
				<div className="bg-tangerine-950 rounded-lg p-4">
					<code className="text-white">
						<span className="text-green-300">xattr</span> –c{' '}
						<span className="text-tangerine-300">'Applications/Pato Puto.app'</span>
					</code>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Fechar
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
