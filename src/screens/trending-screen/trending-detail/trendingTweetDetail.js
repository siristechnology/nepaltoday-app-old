import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { TwitterListContainer } from '../../../layout/twitter/twitter-list.container'

const TrendingTweetDetail = (props) => {
	const [refreshing, setRefreshing] = useState(false)

	const GET_TWEETS_BY_HANDLE = gql`
        query trendingDetail{
            getTweetByHandle(handle: "${props.trending.handle}"){
                _id,
                text,
                tweetId,
                handle,
                publishedDate,
                name,
                createdAt,
                profileImage,
                description,
            }
        }
    `

	const { loading, data, refetch } = useQuery(GET_TWEETS_BY_HANDLE, {
		variables: {},
	})

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	return (
		<View style={{ flex: 1 }}>
			<View refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
				{(loading && (
					<View style={styles.loaderContainer}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				)) || (
					<TwitterListContainer
						tweets={data.getTweetByHandle}
					/>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	headerView: {
		padding: 10,
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerText: {
		fontSize: 19,
		color: '#000',
		opacity: 0.8,
		fontWeight: 'bold',
	},
	loaderContainer: {
		marginTop: 30,
		justifyContent: 'center',
	},
})

export default TrendingTweetDetail
