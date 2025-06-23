import { DiskSvg } from '@/app/(landing-page)/assets/images/record-player/disk'
import { type AnimationPlaybackControls, animate, motion, useMotionValue } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import musicDisk from '../../../assets/images/music-disk.png'

interface DiskProps {
	active: boolean
	setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const Disk = ({ active, setActive }: DiskProps) => {
	const diskRotate = useMotionValue(0)
	const animation = useRef<AnimationPlaybackControls | null>(null)

	const play = () => {
		animation.current = animate(diskRotate, [0, 360], {
			repeat: Number.POSITIVE_INFINITY,
			repeatType: 'loop',
			ease: 'linear',
			duration: 10
		})
	}

	const pause = () => animation.current?.pause()
	const resume = () => animation.current?.play()

	useEffect(() => {
		if (active && !animation.current) {
			play()
			return
		}

		if (animation.current?.state === 'paused') {
			resume()
			return
		}

		pause()
	}, [active])

	return (
		<motion.div
			className="relative cursor-pointer"
			onClick={() => setActive((prev) => !prev)}
			style={{ rotate: diskRotate }}
		>
			<Image
				src={musicDisk}
				alt="Music Disk"
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-14 pointer-events-none"
			/>
			<DiskSvg />
		</motion.div>
	)
}
