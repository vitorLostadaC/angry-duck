import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '~/src/renderer/components/ui/dialog'
import { AuthenticateForm } from './components/authenticate-form'
import { ConfirmCodeForm } from './components/confirm-code-form'
import type { Step } from './types/steps'

interface AuthenticateDialogProps {
	children?: React.ReactNode
	open: boolean
	setOpen: (open: boolean) => void
}

export const AuthenticateDialog = ({ children, open, setOpen }: AuthenticateDialogProps) => {
	const [step, setStep] = useState<Step>('get-code')
	const [email, setEmail] = useState('')

	const handleReset = () => {
		setStep('get-code')
		setEmail('')
	}

	return (
		<Dialog
			open={open}
			onOpenChange={(value) => {
				if (!value) {
					handleReset()
				}
				setOpen(value)
			}}
		>
			{children && <DialogTrigger asChild>{children}</DialogTrigger>}
			<DialogContent className="sm:max-w-md">
				{step === 'get-code' && <AuthenticateForm setStep={setStep} setEmail={setEmail} />}
				{step === 'confirm-code' && <ConfirmCodeForm email={email} />}
			</DialogContent>
		</Dialog>
	)
}
