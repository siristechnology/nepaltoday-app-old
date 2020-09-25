import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { TwitterListContainer } from '../../../layout/twitter/twitter-list.container'

const TrendingDetail = (props) => {
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
			<View style={styles.headerView}>
				<Icon name="back" size={24} color="#000" onPress={props.closeDetail} />
				<Text style={styles.headerText}>{props.trending.name}</Text>
				<View />
			</View>
			<View refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
				{(loading && (
					<View style={styles.loaderContainer}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				)) || (
					<TwitterListContainer
						tweets={data.getTweetByHandle}
						header={
							<View style={styles.imageContainer}>
								<Image source={{ uri: props.trending.image }} style={styles.imageStyle} />
								<Text style={{ marginTop: 10, fontSize: 14 }}>{props.trending.handle}</Text>
							</View>
						}
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
	imageContainer: {
		padding: 25,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FAF9FE',
	},
	imageStyle: {
		height: 75,
		width: 75,
		borderRadius: 40,
	},
	loaderContainer: {
		marginTop: 30,
		justifyContent: 'center',
	},
})

export default TrendingDetail
