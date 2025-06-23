import { anim } from '@/lib/utils'
import { type AnimationPlaybackControls, animate, motion, useMotionValue } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import musicDisk from '../assets/images/music-disk.png'
import { Disk } from '../assets/images/record-player/disk'
import { ToneArm } from '../assets/images/record-player/tone-arm'
import {
	animationDelayByChild,
	animationDuration,
	initialAnimationDelay
} from '../constants/animations'

export const PlayerRecord = () => {
	const [active, setActive] = useState(false)

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
				<Disk />
			</motion.div>
			<ToneArm />
		</motion.div>
	)
}
