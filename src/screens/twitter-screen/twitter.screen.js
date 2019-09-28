import { Spinner } from 'native-base'
import { FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { useNetInfo } from '@react-native-community/netinfo'

import environment from '../../environment'
import { TwitterCard } from '../../components'
import AppLayout from '../../frame/app-layout'

const TwitterComponent = ({ navigation }) => {
	const netInfo = useNetInfo()
	const [isConnected, setConnected] = useState(true)
	useEffect(() => {
		setConnected(netInfo.isConnected)
	}, [netInfo.isConnected])
	return (
		<QueryRenderer
			environment={environment}
			query={graphql`
				query twitterQuery {
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
			`}
			render={({ error, props }) => {
				console.log('twitter props here', props)
				if (!props) {
					return (
						<AppLayout>
							<Spinner />
						</AppLayout>
					)
				} else if (error) {
					console.log('error:' + JSON.stringify(error))
				}
				return (
					<AppLayout>
						<FlatList
							data={props.getTweets}
							keyExtractor={item => item._id}
							renderItem={({ item }) => {
								return (
									<TwitterCard
										tweet={item}
										key={item.id}
										navigation={navigation}
									/>
								)
							}}
						/>
					</AppLayout>
				)
			}}
		/>
	)
}
export default TwitterComponent
