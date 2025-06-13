import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '~/src/renderer/lib/utils'

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-gradient-to-b from-tangerine-400 to-tangerine-500 text-tangerine-950 [a&]:hover:opacity-80',
				secondary: 'bg-gradient-to-b from-gray-800 to-gray-900 text-white  [a&]:hover:opacity-80',
				destructive:
					'border-transparent bg-gradient-to-b from-red-500 to-red-600 text-white [a&]:hover:opacity-80 focus-visible:ring-red-500/20'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span'

	return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
