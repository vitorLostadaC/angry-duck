import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { ActionButton } from '~/src/renderer/components/ui/action-button'
import { DialogFooter, DialogHeader, DialogTitle } from '~/src/renderer/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '~/src/renderer/components/ui/form'
import { Input } from '~/src/renderer/components/ui/input'
import { catchError } from '~/src/renderer/lib/utils'
import { getCode } from '~/src/renderer/requests/auth/get-code'
import type { Step } from '../types/steps'

const formSchema = z.object({
	email: z
		.string()
		.email({ message: 'Não sabe oq é email?' })
		.min(1, { message: 'Email é obrigatório' })
})

type FormValues = z.infer<typeof formSchema>

interface AuthenticateFormProps {
	setStep: (step: Step) => void
	setEmail: (email: string) => void
}

export const AuthenticateForm = ({ setStep, setEmail }: AuthenticateFormProps) => {
	const form = useForm<FormValues>({
		defaultValues: {
			email: ''
		},
		resolver: zodResolver(formSchema)
	})

	const { mutateAsync: authenticate, isPending } = useMutation({
		mutationKey: ['authenticate'],
		mutationFn: getCode
	})

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const [error] = await catchError(authenticate(data))

		if (error) {
			toast.error(
				'MEU DEUS, quebrou o login. Ai não dá, o dev tá muito incompetente, tenta de novo mais tarde...'
			)
			return
		}

		setEmail(data.email)
		toast.success('Dá uma olhada no teu e-mail cheio de tralha ou no spam, e confirma o código.')
		setStep('confirm-code')
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Login</DialogTitle>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="email@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<DialogFooter className="col-span-2">
						<ActionButton loading={isPending} className="w-full mt-2">
							{isPending && <Loader2 className="size-4 animate-spin text-tangerine-950" />}
							{!isPending && 'Enviar código'}
						</ActionButton>
					</DialogFooter>
				</form>
			</Form>
		</>
	)
}
