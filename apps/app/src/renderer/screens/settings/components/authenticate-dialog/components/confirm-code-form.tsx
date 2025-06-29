import { zodResolver } from '@hookform/resolvers/zod'
import type { UserJWT } from '@repo/api-types/user.schema'
import { useMutation } from '@tanstack/react-query'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { jwtDecode } from 'jwt-decode'
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
	FormMessage
} from '~/src/renderer/components/ui/form'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '~/src/renderer/components/ui/input-otp'
import { catchError } from '~/src/renderer/lib/utils'
import { confirmCode } from '~/src/renderer/requests/auth/confirm-code'
import { useAuth } from '../../../hooks/use-auth'

const formSchema = z.object({
	code: z
		.string()
		.min(1, { message: 'Código é obrigatório' })
		.max(6, { message: 'Ta de sacanagem?' })
})

type FormValues = z.infer<typeof formSchema>

interface ConfirmCodeFormProps {
	email: string
}

export const ConfirmCodeForm = ({ email }: ConfirmCodeFormProps) => {
	const { updateAuth } = useAuth()
	const form = useForm<FormValues>({
		defaultValues: {
			code: ''
		},
		resolver: zodResolver(formSchema)
	})

	const { mutateAsync: confirmCodeMutation, isPending } = useMutation({
		mutationKey: ['confirm-code'],
		mutationFn: confirmCode
	})

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const [error, response] = await catchError(confirmCodeMutation({ ...data, email }))

		if (error) {
			toast.error('Código inválido, o cara conseguiu escrever o código errado kkkkk')
			return
		}

		const decodeToken = jwtDecode(response.token) as UserJWT

		await updateAuth({
			accessToken: response.token,
			email,
			userId: decodeToken.userId
		})
		toast.success('Seja bem vindo!')
	}

	return (
		<>
			<DialogHeader>
				<DialogTitle>Código de verificação</DialogTitle>
			</DialogHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup>
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<DialogFooter className="col-span-2">
						<ActionButton type="submit" className="w-full mt-2" loading={isPending}>
							{isPending && <Loader2 className="size-4 animate-spin text-tangerine-950" />}
							{!isPending && 'Enviar código'}
						</ActionButton>
					</DialogFooter>
				</form>
			</Form>
		</>
	)
}
