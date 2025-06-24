import { ToneArmSvg } from '@/app/(landing-page)/assets/images/record-player/tone-arm-svg'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface ToneArmProps {
	setActive: React.Dispatch<React.SetStateAction<boolean>>
	setIsDraggingToneArm: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToneArm = ({ setActive, setIsDraggingToneArm }: ToneArmProps) => {
	const toneArmRotate = useMotionValue(0)
	const smoothRotate = useSpring(toneArmRotate, { bounce: 0 })

	const minRotate = -10
	const maxRotate = 25

	return (
		<motion.div
			style={{ touchAction: 'none' }}
			whileHover={{ cursor: 'grab' }}
			whileTap={{ cursor: 'grabbing', scale: 1.05 }}
			onPanStart={() => setIsDraggingToneArm(true)}
			onPan={(_, info) => {
				const next = toneArmRotate.get() - info.delta.x
				const clamped = Math.max(minRotate, Math.min(maxRotate, next))
				toneArmRotate.set(clamped)
			}}
			onPanEnd={() => {
				setIsDraggingToneArm(false)
				const isOnDisk = toneArmRotate.get() > 16.5
				setActive(isOnDisk)
			}}
		>
			<motion.div className="origin-top" style={{ rotate: smoothRotate }}>
				<ToneArmSvg />
			</motion.div>
		</motion.div>
	)
}
