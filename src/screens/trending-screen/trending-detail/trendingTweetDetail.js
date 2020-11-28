import React, { useState } from 'react'
import { View } from 'react-native'
import { TwitterListContainer } from '../../../layout/twitter/twitter-list.container'

const TrendingTweetDetail = (props) => {
	const [refreshing, setRefreshing] = useState(false)
	const {data, refetch} = props

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	return (
		<View style={{ flex: 1 }}>
			<TwitterListContainer
				refreshing={refreshing} 
				onRefresh={handleRefresh}
				tweets={data.getTweetByHandle}
			/>
		</View>
	)
}

export default TrendingTweetDetail
