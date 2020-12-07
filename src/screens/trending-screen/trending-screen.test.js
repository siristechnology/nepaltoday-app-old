import React from 'react'
import { render, act } from '@testing-library/react-native'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import TrendingScreen from './index'
import ErrorBoundary from '../../error/error-boundry'
import { MockedProvider } from '@apollo/client/testing'
import { GET_TWEETS_QUERY } from './trending-tabs/trending-tweets/twitter.screen'
import { GET_TRENDING } from './trending-tabs/trending-persons/trending.screen'

describe('trending.screen', () => {
	it('trending screen renders properly', async () => {
		const promise = Promise.resolve()
		const navigation = { navigate: jest.fn(), state: {} }
		const mocks = [
			{
				request: {
					query: GET_TWEETS_QUERY,
				},
				result: {
					data: {
						"getTweets": [
                            {
                              "_id": "5fcdd87fe825a6366c48c589",
                              "text": "बुढीगण्डकी आयोजना प्रभावित गोरखा र धादिंगका जनताका जायज माग सरकारले तुरून्त पूरा गरोस्। कमिसनको खेलमा अल्झेको यो ने… https://t.co/z5bCKU4VqQ",
                              "name": "Baburam Bhattarai",
                              "tweetId": "1335847292994121728",
                              "handle": "@brb1954",
                              "profileImage": "https://pbs.twimg.com/profile_images/741978612434227201/UkmkHiYy.jpg",
                              "description": "Former Prime Minister of Nepal (2011-2013). Janata Samajwadi Party. Palungtar-1,Gorkha. Architect/Urban Planner/PhD in Regional Development Planning, 1986, JNU.",
                              "publishedDate": "1607325788000"
                            },
                            {
                              "_id": "5fcdd3fee825a6366c48c373",
                              "text": "Synonym of a woman is “helpless,” says a government textbook, and Facebook users are outraged https://t.co/saPAjWwC5i",
                              "name": "Subhash Ghimire",
                              "tweetId": "1335841032265584641",
                              "handle": "@subhash580",
                              "profileImage": "https://pbs.twimg.com/profile_images/1311874579653038082/pd-bOz50.jpg",
                              "description": "Editor in Chief, Republica. MPP, Harvard Kennedy School @RepublicaNepal",
                              "publishedDate": "1607324295000"
                            },
                        ]
					},
				},
            },
            {
                request: {
                    query: GET_TRENDING
                },
                result: {
                    data: {
                        "getTrending": {
                            "createdAt": "1607324611422",
                            "trendings": [
                                {
                                    "category": "Politics",
                                    "counts": [
                                        {
                                            "name": "Kamal Thapa",
                                            "nepaliName": "कमल थापा",
                                            "handle": "@KTnepal",
                                            "count": 103,
                                            "image": "https://pbs.twimg.com/profile_images/1323207422081556481/SwYfSyue.jpg"
                                        },
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
		]

		render(
			<ApplicationProvider {...eva} theme={eva.light}>
				<ErrorBoundary>
					<MockedProvider mocks={mocks} addTypename={false}>
						<TrendingScreen navigation={navigation} />
					</MockedProvider>
				</ErrorBoundary>
			</ApplicationProvider>,
		)

		await act(() => promise)
	})
})
