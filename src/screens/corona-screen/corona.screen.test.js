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

describe('load corona screen', () => {
	test('should load corona screen properly', async () => {
		const promise = Promise.resolve()
		const mocks = {
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

		const component = (
			<SafeAreaProvider>
				<ApplicationProvider {...eva}>
					<PaperProvider>
						<NavigationContainer>
							<MockedProvider mocks={mocks}>
								<Container>
									<Text>sdjsdjssdd</Text>
								</Container>
							</MockedProvider>
						</NavigationContainer>
					</PaperProvider>
				</ApplicationProvider>
			</SafeAreaProvider>
		)

		const { debug } = render(component)

		debug()

		await act(() => promise)
	})
})
