import type { User } from '@repo/api-types/user.dto'
import { Collections } from '../../constants/mongo'
import { getDb } from '../../lib/mongo'

export const findUserById = async (userId: string) => {
	const db = await getDb()
	const user = await db.collection<User>(Collections.Users).findOne({ userId })
	return user
}

export const findUserByEmail = async (email: string) => {
	const db = await getDb()
	const user = await db.collection<User>(Collections.Users).findOne({ email })
	return user
}

export const chargeUser = async (userId: string) => {
	const db = await getDb()
	const user = await db
		.collection<User>(Collections.Users)
		.updateOne({ userId }, { $inc: { credits: -1 } })
	return user
}

export const refundUser = async (userId: string) => {
	const db = await getDb()
	const user = await db
		.collection<User>(Collections.Users)
		.updateOne({ userId }, { $inc: { credits: 1 } })
	return user
}

export const addCredits = async (userId: string, credits: number) => {
	const db = await getDb()
	const user = await db
		.collection<User>(Collections.Users)
		.updateOne({ userId }, { $inc: { credits } })
	return user
}

interface CreateUserProps {
	email: string
}

export const createUser = async ({ email }: CreateUserProps) => {
	const db = await getDb()
	const user = await db
		.collection<User>(Collections.Users)
		.insertOne({ email, credits: 3, createdAt: new Date().toISOString() })
	return user
}
