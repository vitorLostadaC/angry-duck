import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import vintageDuck from '../assets/images/vintage-duck.png'
import { animationDelayByChild, initialAnimationDelay } from '../constants/animations'

const ImageMotion = motion.create(Image)

export const VintageDucks = () => {
	const [alreadyRunnedAnimation, setAlreadyRunnedAnimation] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setAlreadyRunnedAnimation(true)
		}, 5000)
	}, [])

	useEffect(() => {}, [])
	return [...new Array(2)].map((_, i) => (
		<ImageMotion
			key={`vintage-duck-${i}`}
			src={vintageDuck}
			alt="Vintage Duck"
			className={cn(
				'fixed bottom-0  h-auto w-96  translate-y-28 z-0',
				i === 1 && 'md:block hidden',
				i === 0
					? 'left-0 -translate-x-40 md:-translate-x-20'
					: 'right-0 scale-x-[-1] translate-x-20',
				!alreadyRunnedAnimation && 'z-10'
			)}
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{ opacity: 1, filter: 'blur(0px)' }}
			transition={{
				duration: 0.85,
				ease: [0.39, 0.57, 0.56, 1],
				delay: initialAnimationDelay + animationDelayByChild * 4
			}}
		/>
	))
}
