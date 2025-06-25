import { motion } from 'framer-motion'
import { PetState, pets } from './duck/constants/pet'

interface DucksLookingProps {
	active: boolean
}

export const DucksLooking = ({ active }: DucksLookingProps) => {
	const ducks = [
		// top left
		{
			translate: {
				from: {
					x: -70,
					y: -70
				},
				to: {
					x: -20,
					y: -20
				}
			},
			position: {
				left: 0,
				top: 0
			},
			rotate: 125
		},
		// top right
		{
			translate: {
				from: {
					x: 70,
					y: -70
				},
				to: {
					x: 25,
					y: -25
				}
			},
			position: {
				right: 0,
				top: 0
			},
			rotate: 225
		},
		// bottom left
		{
			translate: {
				from: {
					x: -70,
					y: 70
				},
				to: {
					x: -35,
					y: 40
				}
			},
			position: {
				left: 0,
				bottom: 0
			},
			rotate: 45
		},
		// bottom right
		{
			translate: {
				from: {
					x: 70,
					y: 70
				},
				to: {
					x: 30,
					y: 10
				}
			},
			position: {
				right: 0,
				bottom: 0
			},
			rotate: -45
		},
		// middle left
		{
			translate: {
				from: {
					x: -70,
					y: 0
				},
				to: {
					x: -40,
					y: 0
				}
			},
			position: {
				left: 0,
				top: '40%'
			},
			rotate: 40
		},
		// middle right
		{
			translate: {
				from: {
					x: 90,
					y: 0
				},
				to: {
					x: 40,
					y: 0
				}
			},
			position: {
				right: 0,
				top: '70%'
			},
			rotate: -40
		},
		// top center
		{
			translate: {
				from: {
					x: 0,
					y: -80
				},
				to: {
					x: 0,
					y: -50
				}
			},
			position: {
				left: '50%',
				top: 0,
				transform: 'translateX(-50%)'
			},
			rotate: 180
		},
		// bottom center
		{
			translate: {
				from: {
					x: 0,
					y: 80
				},
				to: {
					x: 0,
					y: 50
				}
			},
			position: {
				left: '50%',
				bottom: 0,
				transform: 'translateX(-50%)'
			},
			rotate: 0
		}
	]

	return (
		<div className="pointer-events-none fixed inset-0">
			{ducks.map((duck, index) => (
				<motion.img
					key={index}
					src={pets.duck[PetState.STOPPED]}
					alt="Duck"
					className="size-20 absolute"
					style={{
						...duck.position,
						rotate: duck.rotate
					}}
					animate={active ? duck.translate.to : duck.translate.from}
					transition={{
						duration: 0.2,
						ease: [0.86, 0, 0.07, 1]
					}}
				/>
			))}
		</div>
	)
}
