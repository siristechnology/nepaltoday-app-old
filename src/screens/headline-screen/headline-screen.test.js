import React from 'react'
import { render, act } from '@testing-library/react-native'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import HeadlineScreen, { GET_ARTICLES_QUERY } from './headline.screen'
import ErrorBoundary from '../../error/error-boundry'
import { MockedProvider } from '@apollo/client/testing'

describe('headline.screen', () => {
	it('headline screen renders properly', async () => {
		const promise = Promise.resolve()
		const navigation = { navigate: jest.fn(), state: {} }
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
		]

		render(
			<ApplicationProvider {...eva} theme={eva.light}>
				<ErrorBoundary>
					<MockedProvider mocks={mocks} addTypename={false}>
						<HeadlineScreen navigation={navigation} />
					</MockedProvider>
				</ErrorBoundary>
			</ApplicationProvider>,
		)

		await act(() => promise)
	})
})
