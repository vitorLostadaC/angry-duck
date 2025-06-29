import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Button, type ButtonProps } from './button'

interface ButtonActionProps extends ButtonProps {
	children: React.ReactNode
	loading?: boolean
}

export const ActionButton: React.FC<ButtonActionProps> = ({ loading, children, ...props }) => (
	<Button variant="default" disabled={loading} {...props}>
		<AnimatePresence initial={false} mode="popLayout">
			<motion.span
				key={children?.toString()}
				initial={{
					y: -25,
					opacity: 0
				}}
				animate={{
					y: 0,
					opacity: 1,
					transition: { bounce: 0, type: 'spring', duration: 0.3 }
				}}
				exit={{ y: 25, opacity: 0 }}
			>
				{loading && <Loader2 className="size-4 animate-spin text-tangerine-950" />}
				{!loading && children}
			</motion.span>
		</AnimatePresence>
	</Button>
)
