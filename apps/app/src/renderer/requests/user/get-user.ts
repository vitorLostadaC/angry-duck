import { api } from '@renderer/lib/axios'
import type { User } from '@repo/api-types/user.schema'

export const getUser = async (userId: string): Promise<User> => await api.get(`/user/${userId}`)
