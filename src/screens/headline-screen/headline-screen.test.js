import React from 'react'
import { render, act } from '@testing-library/react-native'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import HeadlineScreen from './headline.screen'

describe('headline.screen', () => {
	it('headline screen renders properly', async () => {
		const promise = Promise.resolve()
		const navigation = { navigate: jest.fn(), state: {} }
		render(
			<ApplicationProvider {...eva} theme={eva.light}>
				<HeadlineScreen navigation={navigation} />
			</ApplicationProvider>,
		)

		await act(() => promise)
	})
})
