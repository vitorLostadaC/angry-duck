import type { User } from '@repo/api-types/user.schema'
import { ObjectId } from 'mongodb'
import { Collections } from '../../constants/mongo'
import { getDb } from '../../lib/mongo'

export const findUserById = async (userId: string) => {
	const db = await getDb()
	const user = await db.collection<User>(Collections.Users).findOne({ _id: new ObjectId(userId) })
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
		.updateOne({ _id: new ObjectId(userId) }, { $inc: { credits: -1 } })
	return user
}

export const refundUser = async (userId: string) => {
	const db = await getDb()
	const user = await db
		.collection<User>(Collections.Users)
		.updateOne({ _id: new ObjectId(userId) }, { $inc: { credits: 1 } })
	return user
}

export const addCredits = async (userId: string, credits: number) => {
	const db = await getDb()
	const user = await db
		.collection<User>(Collections.Users)
		.updateOne({ _id: new ObjectId(userId) }, { $inc: { credits } })
	return user
}

interface CreateUserProps {
	email: string
}

export const createUser = async ({ email }: CreateUserProps) => {
	const db = await getDb()
	const user = await db
		.collection<User>(Collections.Users)
		.insertOne({ email, credits: 30, actived: false, createdAt: new Date().toISOString() })
	return user
}

export const updateUser = async (userId: string, data: Partial<User>) => {
	const db = await getDb()
	const user = await db
		.collection<User>(Collections.Users)
		.updateOne({ _id: new ObjectId(userId) }, { $set: data })
	return user
}
