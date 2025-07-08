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
					<DialogDescription>
						Quando voce tentar abrir vai aparecer uma mensagem de erro, mas na verdade o app ainda
						nao foi assinado. abra seu terminar e rode este commando
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
