import { Button, type buttonVariants } from '@/components/ui/button'
import { type Os, anim, cn, getMyOs } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'
import { useSound } from 'use-sound'
import { GithubIcon } from '../assets/icons/github-icon'
import { LinuxIcon } from '../assets/icons/linux-icon'
import { MacIcon } from '../assets/icons/mac-icon'
import { WindowsIcon } from '../assets/icons/windows-icon'
import {
	animationDelayByChild,
	animationDuration,
	initialAnimationDelay
} from '../constants/animations'
import { AppVersion } from '../constants/version'
import { downloadLatestRelease } from '../lib/download-latest-release'

type DownloadButton = {
	label: string
	icon: React.ReactNode

	variant: VariantProps<typeof buttonVariants>['variant']
	os?: Os
} & (
	| {
			version: AppVersion
	  }
	| {
			link: string
	  }
)

const fadeBlurUp = anim({
	initial: { opacity: 0, y: 5, filter: 'blur(4px)' },
	animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
})

export const HeroActions = () => {
	const [hoverSound] = useSound('/sounds/sound6.mp3')
	const [clickSound] = useSound('/sounds/sound4.mp3')

	const currentOs = getMyOs()

	console.log(currentOs)

	const downloadButtons: DownloadButton[] = [
		{
			label: 'Baixar para Mac',
			icon: <MacIcon className="w-4 h-4" />,
			version: AppVersion.Mac,
			variant: 'default',
			os: 'mac'
		},
		{
			label: 'Baixar para Windows',
			icon: <WindowsIcon className="w-4 h-4" />,
			version: AppVersion.Windows,
			variant: 'default',
			os: 'windows'
		},
		{
			label: 'Baixar .deb',
			icon: <LinuxIcon className="w-4 h-4" />,
			version: AppVersion.LinuxDeb,
			variant: 'default',
			os: 'linux'
		},
		{
			label: 'Baixar .AppImage',
			icon: <LinuxIcon className="w-4 h-4" />,
			version: AppVersion.LinuxAppImage,
			variant: 'default',
			os: 'linux'
		},
		{
			label: 'Baixar .rpm',
			icon: <LinuxIcon className="w-4 h-4" />,
			version: AppVersion.LinuxRpm,
			variant: 'default',
			os: 'linux'
		},
		{
			label: 'Github',
			icon: <GithubIcon className="w-4 h-4" />,
			link: 'https://github.com/vitorLostadaC/angry-duck',
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
				className="flex flex-wrap max-w-[450px] gap-4 justify-center"
				{...fadeBlurUp}
				transition={{
					duration: animationDuration,
					ease: [0.39, 0.57, 0.56, 1],
					delay: initialAnimationDelay + animationDelayByChild * 2
				}}
			>
				{downloadButtons
					.filter((button) => button.os === currentOs || !button.os)
					.map((button) => (
						<Button
							key={button.label}
							variant={button.variant}
							onMouseEnter={() => hoverSound()}
							onMouseDown={() => {
								clickSound()
								if ('version' in button) {
									downloadLatestRelease(button.version)
								} else {
									window.open(button.link, '_blank')
								}
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
