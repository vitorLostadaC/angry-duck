'use client'

import { PetWalking } from './components/duck/pet'
import { HeroActions } from './components/hero-actions'
import { PlayerRecord } from './components/player-record/player-record'
import { VintageDucks } from './components/vintage-ducks'

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-dvh selection:bg-tangerine-300">
			<HeroActions />
			<PlayerRecord />
			<VintageDucks />
			<PetWalking />
		</div>
	)
}
