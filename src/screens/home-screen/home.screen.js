import { Spinner } from 'native-base'
import Analytics from 'appcenter-analytics'
import React, { useState, useEffect } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { FlatList, RefreshControl, AppState } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'

import environment from '../../environment'
import { ArticleCard } from '../../components'
import AppLayout from '../../frame/app-layout'

const Home = ({ navigation, actions }) => {
	const netInfo = useNetInfo()
	const [isUpdated, setUpdated] = useState(false)
	const [isConnected, setConnected] = useState(true)
	const [appState, setAppState] = useState(AppState.currentState)

	const handleRefresh = () => {
		setUpdated(!isUpdated)
	}
	useEffect(() => {
		setConnected(netInfo.isConnected)
	}, [netInfo.isConnected])

	const updateAppState = nextAppState => {
		if (
			appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			handleRefresh()
		}
		setAppState(nextAppState)
	}

	useEffect(() => {
		Analytics.trackEvent('Home page loaded')
		AppState.addEventListener('change', updateAppState)
		return () => {
			AppState.removeEventListener('change', updateAppState)
		}
	}, [])

	return (
		<QueryRenderer
			environment={environment}
			query={graphql`
				query homeScreenQuery {
					getArticles {
						_id
						title
						shortDescription
						content
						link
						imageLink
						publishedDate
						modifiedDate
						category
						source {
							_id
							name
							logoLink
						}
					}
				}
			`}
			variables={{
				isConnected,
				isUpdated,
			}}
			render={({ error, props: data }) => {
				if (!data) {
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
							data={data.getArticles}
							keyExtractor={item => item._id}
							extraData={isUpdated}
							renderItem={({ item }) => {
								return (
									<ArticleCard
										article={item}
										key={item._id}
										actions={actions}
										navigation={navigation}
									/>
								)
							}}
							refreshControl={
								<RefreshControl
									colors={['#9Bd35A', '#689F38']}
									onRefresh={handleRefresh}
								/>
							}
						/>
					</AppLayout>
				)
			}}
		/>
	)
}

export default Home
