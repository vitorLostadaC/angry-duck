import { Button, type buttonVariants } from '@/components/ui/button'
import { anim, cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'
import { useSound } from 'use-sound'
import { GithubIcon } from '../assets/icons/github-icon'
import { MacIcon } from '../assets/icons/mac-icon'
import {
	animationDelayByChild,
	animationDuration,
	initialAnimationDelay
} from '../constants/animations'
import { AppVersion } from '../constants/version'
import { downloadLatestRelease } from '../lib/download-latest-release'

interface DownloadButton {
	label: string
	icon: React.ReactNode
	version: AppVersion
	variant: VariantProps<typeof buttonVariants>['variant']
}

const fadeBlurUp = anim({
	initial: { opacity: 0, y: 5, filter: 'blur(4px)' },
	animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
})

export const HeroActions = () => {
	const [hoverSound] = useSound('/sounds/sound6.mp3')
	const [clickSound] = useSound('/sounds/sound4.mp3')

	const downloadButtons: DownloadButton[] = [
		{
			label: 'Baixar para Mac',
			icon: <MacIcon className="w-4 h-4" />,
			version: AppVersion.Mac,
			variant: 'default'
		},
		{
			label: 'Github',
			icon: <GithubIcon className="w-4 h-4" />,
			version: AppVersion.Mac,
			variant: 'secondary'
		}
	]

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
				{downloadButtons.map((button) => (
					<Button
						key={button.label}
						variant={button.variant}
						onMouseEnter={() => hoverSound()}
						onMouseDown={() => {
							clickSound()
							downloadLatestRelease(button.version)
						}}
					>
						{button.icon}
						{button.label}
					</Button>
				))}
			</motion.div>
		</div>
	)
}
