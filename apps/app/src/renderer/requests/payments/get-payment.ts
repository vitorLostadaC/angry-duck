import type { Payment } from '@repo/api-types/payment.dto'
import { api } from '../../lib/api'

export const getPayment = async (paymentId: string): Promise<Payment> =>
	await api.get(`/payment/pix/${paymentId}`)
