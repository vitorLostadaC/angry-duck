import { AuthenticationCodeEmail } from '../../../emails/authentication-code'
import { resend } from '../../../lib/resend'
import { createUser, findUserByEmail } from '../../../services/mongo/user'
import { createOrUpdateUserCode } from '../../../services/mongo/user-codes'

export class AuthenticateUseCase {
	async execute(email: string) {
		const user = await findUserByEmail(email)

		if (!user) {
			await createUser({
				email
			})
		}

		const sixDigitCode = Math.floor(100000 + Math.random() * 900000).toString()

		const userCode = await createOrUpdateUserCode({
			email,
			code: sixDigitCode
		})

		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: email,
			subject: 'Your six digit code to authenticate',
			react: <AuthenticationCodeEmail code={sixDigitCode} />
		})

		return userCode
	}
}
