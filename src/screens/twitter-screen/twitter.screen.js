import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { TwitterListContainer } from '../../layout/twitter/twitter-list.container'

const TwitterComponent = ({}) => {
	const [refreshing, setRefreshing] = useState(false)

	const { loading, data, refetch, error } = useQuery(GET_TWEETS_QUERY, {
		variables: {},
	})

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	if (loading) {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	} else if (error) {
		console.log('error:' + JSON.stringify(error))
	}

	return (
		<AppLayout>
			<View style={style.headerStyle}>
				<Text style={style.textStyle}>Trending Tweets</Text>
			</View>
			<TwitterListContainer tweets={data.getTweets} refreshing={refreshing} handleRefresh={handleRefresh} />
		</AppLayout>
	)
}

const GET_TWEETS_QUERY = gql`
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
			twitterHandle {
				_id
				name
				handle
				category
			}
		}
	}
`

const style = StyleSheet.create({
	headerStyle: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	textStyle: {
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
	},
})

export default TwitterComponent
