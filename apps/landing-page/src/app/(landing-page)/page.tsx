'use client'

import { Button } from '@/components/ui/button'
import { anim, cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import { GithubIcon } from './assets/icons/github-icon'
import { MacIcon } from './assets/icons/mac-icon'
import test from './assets/test.png'
import vintageDuck from './assets/vintage-duck.png'

const initialAnimationDelay = 0.5
const animationDuration = 0.85
const animationDelayByChild = 0.1

const fadeBlurUp = anim({
	initial: { opacity: 0, y: 5, filter: 'blur(4px)' },
	animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
})

const fadeBlur = anim({
	initial: { opacity: 0, y: 0, filter: 'blur(4px)' },
	animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
})

const ImageMotion = motion.create(Image)

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="flex justify-center items-center flex-col text-center gap-10">
				<div className="space-y-4">
					<motion.div
						className={cn('text-8xl text-zinc-800')}
						{...fadeBlurUp}
						transition={{
							duration: animationDuration,
							ease: [0.39, 0.57, 0.56, 1],
							delay: initialAnimationDelay
						}}
					>
						O Pato Puto
					</motion.div>
					<motion.div
						className={cn('text-4xl text-zinc-600')}
						{...fadeBlurUp}
						transition={{
							duration: animationDuration,
							ease: [0.39, 0.57, 0.56, 1],
							delay: initialAnimationDelay + animationDelayByChild
						}}
					>
						Seu novo melhor amigo
					</motion.div>
				</div>
				<motion.div
					className="flex gap-4 justify-center"
					{...fadeBlurUp}
					transition={{
						duration: animationDuration,
						ease: [0.39, 0.57, 0.56, 1],
						delay: initialAnimationDelay + animationDelayByChild * 2
					}}
				>
					<Button>
						<MacIcon className="w-4 h-4" />
						Baixar para Mac
					</Button>
					<Button variant="secondary">
						<GithubIcon className="w-4 h-4" />
						Github
					</Button>
				</motion.div>
			</div>

			<ImageMotion
				src={test}
				alt="Test"
				className="fixed top-0 right-0 w-40 h-auto"
				{...fadeBlur}
				transition={{
					duration: animationDuration,
					ease: [0.39, 0.57, 0.56, 1],
					delay: initialAnimationDelay + animationDelayByChild * 4
				}}
			/>

			{[...new Array(2)].map((_, i) => (
				<ImageMotion
					key={`vintage-duck-${i}`}
					src={vintageDuck}
					alt="Vintage Duck"
					className={cn(
						'fixed bottom-0  h-auto w-96  translate-y-28 ',
						i === 0 ? 'left-0 -translate-x-20' : 'right-0 scale-x-[-1] translate-x-20'
					)}
					{...fadeBlur}
					transition={{
						duration: 0.85,
						ease: [0.39, 0.57, 0.56, 1],
						delay: initialAnimationDelay + animationDelayByChild * 4
					}}
				/>
			))}
		</div>
	)
}
