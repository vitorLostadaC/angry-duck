import { motion } from 'motion/react'
import Image from 'next/image'
import test from '../assets/test.png'
import {
	animationDelayByChild,
	animationDuration,
	initialAnimationDelay
} from '../constants/animations'

const ImageMotion = motion.create(Image)

export const PlayerRecord = () => {
	return (
		<ImageMotion
			src={test}
			alt="Test"
			className="fixed top-0 right-0 w-40 h-auto"
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{ opacity: 1, filter: 'blur(0px)' }}
			transition={{
				duration: animationDuration,
				ease: [0.39, 0.57, 0.56, 1],
				delay: initialAnimationDelay + animationDelayByChild * 4
			}}
		/>
	)
}
