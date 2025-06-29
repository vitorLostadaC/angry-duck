import axios from 'axios'
import { env } from '../env'
import { getStoreOptions } from '../requests/electron-store/options'
import type { ApiError } from '../types/api'
import { queryClient } from './react-query'

export const api = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true
})

api.interceptors.response.use(
	(response) => response.data,
	(e) => {
		console.log(e)
		const error = e.response?.data as ApiError
		if (error.error === 'Unauthorized') {
			queryClient.invalidateQueries(getStoreOptions())
			window.api.store.updateStore({
				store: {
					auth: null
				}
			})
		}
		throw new Error(error.error, { cause: error.message })
	}
)
