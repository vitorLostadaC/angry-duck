import type { UserCode } from '@repo/api-types/user.schema'
import { Collections } from '../../constants/mongo'
import { getDb } from '../../lib/mongo'

export const createOrUpdateUserCode = async (userCode: Omit<UserCode, 'createdAt'>) => {
	const db = await getDb()
	await db
		.collection<UserCode>(Collections.UserCodes)
		.updateOne(
			{ email: userCode.email },
			{ $set: { ...userCode, createdAt: new Date().toISOString() } },
			{ upsert: true }
		)
}

export const findUserCodeByEmail = async (email: string) => {
	const db = await getDb()
	return db.collection<UserCode>(Collections.UserCodes).findOne({ email })
}

export const deleteUserCodeByEmail = async (email: string) => {
	const db = await getDb()
	await db.collection<UserCode>(Collections.UserCodes).deleteOne({ email })
}
