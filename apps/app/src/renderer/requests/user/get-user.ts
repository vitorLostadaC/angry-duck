import type { User } from '@repo/api-types/user.schema'
import { api } from '~/src/renderer/lib/api'

export const getUser = async (userId: string): Promise<User> => await api.get(`/user/${userId}`)
