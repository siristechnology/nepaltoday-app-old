import React from 'react'
import { render, act } from '@testing-library/react-native'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { HeadlineComponent } from '../headline.component'

describe('headline.component', () => {
	it('headline component renders properly', async () => {
		const promise = Promise.resolve()

		const article = {
			_id: '5fc05b6128fc6100305d7943',
			title: 'नेपाली राजनीतिको दुर्भाग्य : झण्डा एक, स्वार्थ अनेक',
			link: 'https://ratopati.com/',
			imageLink: 'https://ratopati.prixacdn.net/',
			category: 'headline',
			totalWeight: 30,
			source: {
				name: 'रातोपाटी',
				logoLink: 'https://nepaltoday-api-qa.herokuapp.com/assets/logos/ratopati.png',
			},
		}
		render(
			<ApplicationProvider {...eva} theme={eva.light}>
				<HeadlineComponent article={article} />
			</ApplicationProvider>,
		)

		await act(() => promise)
	})
})
