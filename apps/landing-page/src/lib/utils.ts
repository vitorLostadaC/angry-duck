import { type ClassValue, clsx } from 'clsx'
import type { Variant } from 'motion'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export type CustomVariant = {
	initial?: Variant
	animate: Variant
	exit?: Variant
}

export function anim(variants: CustomVariant) {
	return {
		initial: 'initial',
		animate: 'animate',
		exit: 'exit',
		variants
	}
}

export type Os = 'mac' | 'windows' | 'linux'

export const getMyOs = (): Os | 'unknown' | 'unsupported' => {
	if (typeof window === 'undefined') return 'unknown'
	const userAgent = window.navigator.userAgent

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
	if (isMobile) return 'unsupported'

	if (userAgent.includes('Mac')) return 'mac'
	if (userAgent.includes('Windows')) return 'windows'
	if (userAgent.includes('Linux')) return 'linux'
	return 'unsupported'
}
