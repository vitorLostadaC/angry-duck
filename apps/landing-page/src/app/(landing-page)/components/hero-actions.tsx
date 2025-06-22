import { Button } from '@/components/ui/button'
import { anim, cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { GithubIcon } from '../assets/icons/github-icon'
import { MacIcon } from '../assets/icons/mac-icon'
import {
	animationDelayByChild,
	animationDuration,
	initialAnimationDelay
} from '../constants/animations'

const fadeBlurUp = anim({
	initial: { opacity: 0, y: 5, filter: 'blur(4px)' },
	animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
})

export const HeroActions = () => {
	return (
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
	)
}
