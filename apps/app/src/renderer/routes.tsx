import { Route } from 'react-router-dom'

import { Router } from '@shared/lib/electron-router-dom'
import { PetScreen } from './screens/pet/pet'
import { Layout } from './screens/settings/layout'
import { AppearancePage } from './screens/settings/pages/appearance-page'
import { GeneralPage } from './screens/settings/pages/general-page'
import { PricingPage } from './screens/settings/pages/pricing-page'

export function Routes() {
	return (
		<Router
			main={<Route path="/" element={<PetScreen />} />}
			settings={
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<GeneralPage />} />
					<Route path="/appearance" element={<AppearancePage />} />
					<Route path="/pricing" element={<PricingPage />} />
				</Route>
			}
		/>
	)
}
