import { AuthenticationCodeEmail } from '../../../emails/authentication-code'
import { resend } from '../../../lib/resend'
import { createUser, findUserByEmail } from '../../../services/mongo/user'
import { createOrUpdateUserCode } from '../../../services/mongo/user-codes'

export class AuthenticateUseCase {
	async execute(email: string) {
		const user = await findUserByEmail(email)
		let userId: string

		if (!user) {
			const result = await createUser({ email })
			userId = result.insertedId.toString()
		} else {
			userId = user._id.toString()
		}

		const sixDigitCode = String(Math.floor(100000 + Math.random() * 900000)).padStart(6, '0')

		await createOrUpdateUserCode({
			email,
			code: sixDigitCode,
			userId
		})

		const result = await resend.emails.send({
			from: 'temporario@paguestream.com',
			to: email,
			subject: 'Ta aqui o codigo Car$#%}#',
			react: <AuthenticationCodeEmail code={sixDigitCode} />
		})

		return { success: true }
	}
}
