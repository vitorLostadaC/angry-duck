import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface AuthenticationCodeEmailProps {
	code?: string
}

export default function AuthenticationCodeEmail({ code }: AuthenticationCodeEmailProps) {
	return (
		<Tailwind>
			<Html>
				<Head />
				<Body className="bg-white text-[#212121]">
					<Preview>Seu código de autenticação</Preview>
					<Container className="p-5 mx-auto ">
						<Section className="bg-white">
							<Section className="bg-[#F5F5DD] flex items-center justify-center rounded-lg overflow-hidden">
								<Img
									src={'https://patoputo.com/images/banner.png'}
									width="100%"
									height="100%"
									alt="Logo do App"
								/>
							</Section>

							<Section className="px-9 py-6">
								<Heading className="text-[#333] font-sans text-[20px] font-bold mb-4">
									Código de Autenticação
								</Heading>
								<Text className="text-[#333] font-sans text-[14px] mb-3.5">
									O que que tá lendo aqui, só copia o código e bota no aplicativo, que o pato já tá
									puto
								</Text>

								{/* Verification Code */}
								<Section className="text-center mb-[32px]">
									<div className="bg-gray-50 border-[2px] border-dashed border-gray-300 rounded-[12px] p-[24px] inline-block">
										<Text className="text-[32px] font-bold text-gray-900 m-0 letter-spacing-[8px] font-mono">
											{code}
										</Text>
									</div>
								</Section>
							</Section>
							<Hr />
							<Section className="px-9 py-6">
								<Text className="text-[#333] font-sans text-[14px] m-0">
									Se tu compartilhar esse código com alguém provavelmente tu é muito bur$# KKKKKK
								</Text>
							</Section>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	)
}

AuthenticationCodeEmail.PreviewProps = {
	code: '596853'
} satisfies AuthenticationCodeEmailProps
