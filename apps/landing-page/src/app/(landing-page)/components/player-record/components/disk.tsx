import { DiskSvg } from '@/app/(landing-page)/assets/images/record-player/disk-svg'
import { type AnimationPlaybackControls, animate, motion, useMotionValue } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import useSound from 'use-sound'
import musicDisk from '../../../assets/images/music-disk.png'

interface DiskProps {
	active: boolean
	isDraggingToneArm: boolean
}

export const Disk = ({ active, isDraggingToneArm }: DiskProps) => {
	const diskRotate = useMotionValue(0)
	const animation = useRef<AnimationPlaybackControls | null>(null)

	const [playSound, controls] = useSound('/sounds/O pato de ipanema.mp3', {
		volume: 0.5
	})

	const startDiskAnimation = () => {
		animation.current = animate(diskRotate, [0, 360], {
			repeat: Number.POSITIVE_INFINITY,
			repeatType: 'loop',
			ease: 'linear',
			duration: 10
		})
	}

	const pauseDiskAnimation = () => animation.current?.pause()
	const resumeDiskAnimation = () => animation.current?.play()

	useEffect(() => {
		const pauseAll = () => {
			pauseDiskAnimation()
			controls.pause()
		}

		if (isDraggingToneArm) {
			pauseAll()
			return
		}

		if (active) {
			playSound()

			if (!animation.current) {
				startDiskAnimation()
			}

			if (animation.current?.state === 'paused') {
				resumeDiskAnimation()
			}
			return
		}

		pauseAll()
	}, [active, isDraggingToneArm])

	return (
		<motion.div className="relative" style={{ rotate: diskRotate }}>
			<Image
				src={musicDisk}
				alt="Music Disk"
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-14 pointer-events-none select-none"
			/>
			<DiskSvg />
		</motion.div>
	)
}
