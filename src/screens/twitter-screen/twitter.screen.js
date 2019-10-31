import React, { useEffect, useState } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { useNetInfo } from '@react-native-community/netinfo'

import environment from '../../environment'
import AppLayout from '../../frame/app-layout'

import { CircularSpinner } from '../../components/common'
import { TwitterListContainer } from '../../layout/twitter/twitter-list.container'

const TwitterComponent = ({}) => {
	const netInfo = useNetInfo()
	const [isConnected, setConnected] = useState(true)
	const [refreshCounter, setRefreshCounter] = useState(0)
	useEffect(() => {
		setConnected(netInfo.isConnected)
	}, [netInfo.isConnected])

	const handleRefresh = () => {
		setRefreshCounter(refreshCounter + 1)
	}
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
			variables={{
				isConnected,
				refreshCounter,
			}}
			render={({ error, props }) => {
				if (!props) {
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
						<TwitterListContainer
							tweets={props.getTweets}
							handleRefresh={handleRefresh}
						/>
					</AppLayout>
				)
			}}
		/>
	)
}
export default TwitterComponent
