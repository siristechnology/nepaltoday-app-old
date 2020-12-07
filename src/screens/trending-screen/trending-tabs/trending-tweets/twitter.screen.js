import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../../../frame/app-layout'
import { CircularSpinner } from '../../../../components/common'
import { TwitterListContainer } from '../../../../layout/twitter/twitter-list.container'
import crashlytics from '@react-native-firebase/crashlytics'

const TwitterComponent = () => {
	const [refreshing, setRefreshing] = useState(false)

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	const { loading, data, refetch, error } = useQuery(GET_TWEETS_QUERY, {
		variables: {},
	})

	if (error) {
		crashlytics().recordError(new Error('Twitter Api error' + error.message))
	}

	if (loading) {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	}

	const tweets = (data && data.getTweets && data.getTweets) || []
	return (
		<AppLayout>
			<TwitterListContainer tweets={tweets} refreshing={refreshing} handleRefresh={handleRefresh} />
		</AppLayout>
	)
}

export const GET_TWEETS_QUERY = gql`
	query twitterScreenQuery {
		getTweets {
			_id
			text
			name
			tweetId
			handle
			profileImage
			description
			publishedDate
		}
	}
`

export default TwitterComponent
