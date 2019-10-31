import { AppState } from 'react-native'
import Analytics from 'appcenter-analytics'
import React, { useState, useEffect } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { useNetInfo } from '@react-native-community/netinfo'

import environment from '../../environment'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { ArticleListContainer } from '../../layout/article'

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
							<CircularSpinner />
						</AppLayout>
					)
				} else if (error) {
					console.log('error:' + JSON.stringify(error))
				}

				return (
					<AppLayout>
						<ArticleListContainer
							navigation={navigation}
							articles={data}
							handleRefresh={handleRefresh}
						/>
					</AppLayout>
				)
			}}
		/>
	)
}

export default Home
