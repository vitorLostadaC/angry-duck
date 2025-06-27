import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const cookies = request.cookies.getAll()

	const clerkHandshake = cookies.find((cookie) => cookie.name === '__clerk_handshake')
	const clerkToeken = cookies.find((cookie) => cookie.name === '__ck_csrf_token')

	return NextResponse.redirect(
		`patoputo://auth?clerk_handshake=${clerkHandshake?.value}&clerk_token=${clerkToeken?.value}`
	)
}
