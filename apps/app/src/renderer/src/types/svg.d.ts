declare module '*.svg?react' {
	import type React from 'react'
	const SVGComponent: React.FC<React.SVGProps<SVGSVGElement>>
	export default SVGComponent
}

declare module '*.svg' {
	const content: string
	export default content
}
