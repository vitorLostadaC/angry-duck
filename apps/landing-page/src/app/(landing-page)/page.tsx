'use client'

import { useState } from 'react'
import { PetWalking } from './components/duck/pet'
import { DucksLooking } from './components/ducks-looking'
import { HeroActions } from './components/hero-actions'
import { PlayerRecord } from './components/player-record/player-record'
import { VintageDucks } from './components/vintage-ducks'

export default function Home() {
	const [buttonHovered, setButtonHovered] = useState(false)

	return (
		<div className="flex flex-col items-center justify-center h-dvh selection:bg-tangerine-300">
			<HeroActions setButtonHovered={setButtonHovered} />
			<PlayerRecord />
			<VintageDucks />
			<PetWalking buttonHovered={buttonHovered} />
			<DucksLooking active={buttonHovered} />
		</div>
	)
}
