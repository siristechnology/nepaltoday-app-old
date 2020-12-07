import React from 'react'
import { render, act } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApplicationProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { MockedProvider } from '@apollo/client/testing'
import { Container } from 'native-base'
import { Text } from 'react-native'
import * as eva from '@eva-design/eva'
import CoronaScreen from './corona.screen'
import ErrorBoundary from '../../error/error-boundry'
import DistrictList,{ GET_DISTRICT_CORONA_STATS } from './coronaDistrictStats/districtList'

describe('load corona screen', () => {
	test('should load corona screen properly', async () => {
		const promise = Promise.resolve()
		const navigation = { navigate: jest.fn(), state: {} }
		const mocks = [
			{
				request: {
					query: GET_DISTRICT_CORONA_STATS
				},
				result: {
					data: {
						getDistrictCoronaStats: {
							createdDate: '1607000964599',
							timeLine: {
								date: null,
								totalCases: 236246,
								newCases: 1490,
								totalRecoveries: null,
								newRecoveries: null,
								totalDeaths: 1538,
								newDeaths: 9,
							},
							districts: [
								{
									name: 'Panchthar',
									nepaliName: 'पाँचथर',
									totalCases: 154,
									newCases: 1,
								},
								{
									name: 'Ilam',
									nepaliName: 'इलाम',
									totalCases: 369,
									newCases: 21,
								},
							],
						},
					},
				}
			}
		]

		const component = (
			<ApplicationProvider {...eva} theme={eva.light}>
				<ErrorBoundary>
					<MockedProvider mocks={mocks} addTypename={false}>
						<DistrictList navigation={navigation} />
					</MockedProvider>
				</ErrorBoundary>
			</ApplicationProvider>
		)

		render(component)

		await act(() => promise)
	})
})
