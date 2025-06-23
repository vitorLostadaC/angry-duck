import { ToneArmSvg } from '@/app/(landing-page)/assets/images/record-player/tone-arm'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface ToneArmProps {
	setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToneArm = ({ setActive }: ToneArmProps) => {
	const toneArmRotate = useMotionValue(0)
	const smoothRotate = useSpring(toneArmRotate, { bounce: 0 })

	return (
		<motion.div
			className="origin-top"
			whileHover={{ cursor: 'grab' }}
			whileTap={{ cursor: 'grabbing', scale: 1.05 }}
			style={{ rotate: smoothRotate }}
			onPan={(_, info) => {
				const minRotate = -10
				const maxRotate = 25
				const next = toneArmRotate.get() - info.delta.x
				const clamped = Math.max(minRotate, Math.min(maxRotate, next))
				toneArmRotate.set(clamped)
			}}
			onPanEnd={() => {
				const rotate = toneArmRotate.get()

				const isOnDisk = rotate > 16.5

				setActive(isOnDisk)
			}}
		>
			<ToneArmSvg />
		</motion.div>
	)
}
