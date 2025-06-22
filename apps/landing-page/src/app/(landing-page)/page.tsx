'use client'

import { HeroActions } from './components/hero-actions'
import { PlayerRecord } from './components/player-record'
import { VintageDucks } from './components/vintage-ducks'

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<HeroActions />
			<PlayerRecord />
			<VintageDucks />
		</div>
	)
}
