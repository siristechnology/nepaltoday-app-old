import React from 'react'
import { render, act } from '@testing-library/react-native'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import RadioScreen from './radio.screen'
import ErrorBoundary from '../../error/error-boundry'
import { MockedProvider } from '@apollo/client/testing'
import gql from 'graphql-tag'

describe('radio.screen', () => {
	it('radio screen renders properly', async () => {
		const promise = Promise.resolve()
		const navigation = { navigate: jest.fn(), state: {} }
        
        const GET_FM_QUERY = gql`
            query fmScreenQuery{
                getMyFm(nid: "") {
                    allFm{
                        id
                        title
                        url
                        artist
                        artwork
                        province
                    }
                    favoriteFm{
                        id
                        title
                        url
                        artist
                        artwork
                        province
                    }
                }
            }
        `
        
        const mocks = [
			{
				request: {
					query: GET_FM_QUERY,
				},
				result: {
                    "data": {
                        "getMyFm": {
                            "allFm": [
                                {
                                    "id": "12",
                                    "title": "Radio Sargam",
                                    "url": "http://rstream.abgroupnepal.com:8000/radiosargam",
                                    "artist": "93",
                                    "artwork": "https://cdn.onlineradiobox.com/img/logo/3/31523.v3.png",
                                    "province": "Province-1"
                                },
                                {
                                    "id": "24",
                                    "title": "Kanchanjungha FM",
                                    "url": "http://live.itechnepal.com:8420/stream",
                                    "artist": "92.6",
                                    "artwork": "https://cdn.onlineradiobox.com/img/logo/1/30211.v1.png",
                                    "province": "Province-1"
                                },
                            ],
                            "favoriteFm": []
                        }
                    }
				}
			}
		]

		render(
			<ApplicationProvider {...eva} theme={eva.light}>
				<ErrorBoundary>
					<MockedProvider mocks={mocks} addTypename={false}>
						<RadioScreen navigation={navigation} />
					</MockedProvider>
				</ErrorBoundary>
			</ApplicationProvider>,
		)

		await act(() => promise)
	})
})
