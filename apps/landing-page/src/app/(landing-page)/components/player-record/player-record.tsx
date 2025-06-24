import { anim } from '@/lib/utils'
import { motion } from 'motion/react'
import { useState } from 'react'
import {
	animationDelayByChild,
	animationDuration,
	initialAnimationDelay
} from '../../constants/animations'
import { Disk } from './components/disk'
import { ToneArm } from './components/tone-arm'

export const PlayerRecord = () => {
	const [active, setActive] = useState(false)
	const [isDraggingToneArm, setIsDraggingToneArm] = useState(false)

	const joinAnimation = anim({
		initial: { opacity: 0, filter: 'blur(4px)' },
		animate: { opacity: 1, filter: 'blur(0px)' }
	})

	return (
		<motion.div
			className="fixed top-2 right-2 w-40 h-auto flex justify-center items-center px-5 py-2.5"
			{...joinAnimation}
			transition={{
				duration: animationDuration,
				ease: [0.39, 0.57, 0.56, 1],
				delay: initialAnimationDelay + animationDelayByChild * 4
			}}
		>
			<Disk active={active} isDraggingToneArm={isDraggingToneArm} />
			<ToneArm setActive={setActive} setIsDraggingToneArm={setIsDraggingToneArm} />
		</motion.div>
	)
}
