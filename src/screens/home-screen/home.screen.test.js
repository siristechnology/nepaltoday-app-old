import React from 'react'
import { render } from '@testing-library/react-native'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import HomeScreen, { GET_ARTICLES_QUERY } from './home.screen'
import ErrorBoundary from '../../error/error-boundry'
import { MockedProvider } from '@apollo/client/testing'
import gql from 'graphql-tag'
import { getNepaliDate } from '../../helper/dateFormatter'
import { FETCH_WEATHER_INFO_QUERY } from './components/weather.component'

describe('home.screen', () => {
	it('home screen renders properly', async () => {
		const navigation = { navigate: jest.fn(), state: {} }
        const FETCH_NEPALI_EVENT = gql`
            query getNepaliEvent {
                getNepaliEvent(date:"${getNepaliDate()}"){
                    isHoliday
                    tithi
                    event
                    day
                    dayInEn
                    en
                }
            }
        `
        const mocks = [
			{
				request: {
					query: GET_ARTICLES_QUERY,
				},
				result: {
					data: {
						getArticles: [
							{
								_id: '5fcd83c716c67f0030f3c338',
								title: "इञ्जिनियरहरूले बनाए संस्कृति र सम्पदा चिनाउने 'पजल'",
								shortDescription: "के तपाईंले सानो छँदा 'पजल' खेल्नुभएको थियो?",
								imageLink: 'https://img.setoparty.com/uploads/posts/puzzle1607277816.jpg',
							},
						],
					},
				},
            },
            {
                request: {
                    query: FETCH_NEPALI_EVENT
                },
                result: {
                    data: {
                        "getNepaliEvent": {
                            "isHoliday": true,
                            "tithi": "नवमी",
                            "event": "महानवमी व्रत",
                            "day": "९",
                            "dayInEn": "9",
                            "en": "25"
                        }
                    }
                }
            },
            {
                request: {
                    query: FETCH_WEATHER_INFO_QUERY
                },
                result: {
                    "getWeatherInfo": {
                        "temperature": 20.32,
                        "condition": "Clouds",
                        "description": "scattered clouds",
                        "place": "Nepal"
                    }
                }
            }
		]

		const { getAllByTestId} = render(
			<ApplicationProvider {...eva} theme={eva.light}>
				<ErrorBoundary>
					<MockedProvider mocks={mocks} addTypename={false}>
						<HomeScreen navigation={navigation} />
					</MockedProvider>
				</ErrorBoundary>
			</ApplicationProvider>,
		)

        await new Promise(resolve => setTimeout(resolve, 0));

        const tests = await getAllByTestId('homeArticle0')
        console.log(tests)
        expect(tests.length).toBeGreaterThan(1)

	})
})
