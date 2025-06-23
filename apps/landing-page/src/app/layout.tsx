import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

const siteTitle = 'Pato Puto'
const siteDescription = 'Um amigo irritado para você nunca mais ficar sozinho'

const siteImage = {
	url: '/images/hero.png',
	width: 1200,
	height: 630,
	alt: 'Pato Puto - Amigo Irritado'
}

export const metadata: Metadata = {
	title: siteTitle,
	description: siteDescription,
	openGraph: {
		images: [siteImage]
	},
	metadataBase: new URL('https://patoputo.com'),
	twitter: {
		card: 'summary_large_image',
		site: 'https://patoputo.com',
		creator: 'https://patoputo.com',
		title: siteTitle,
		description: siteDescription,
		images: [siteImage]
	},
	robots: {
		index: true,
		follow: true
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
		</html>
	)
}
