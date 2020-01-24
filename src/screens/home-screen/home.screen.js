import { AppState, Text, StyleSheet, View } from 'react-native'
import Analytics from 'appcenter-analytics'
import React, { useState, useEffect } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { useNetInfo } from '@react-native-community/netinfo'

import environment from '../../environment'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { ArticleListContainer } from '../../layout/article'
import {
	AD2BS,
	getNepaliMonthsInNepali,
	convertNos,
} from '../../helper/dateConverter'
import { getCurrentDayNameInNepali } from '../../helper/dateFormatter'
import { getCurrentTime } from '../../helper/time'

const Home = ({ navigation, actions }) => {
	const netInfo = useNetInfo()
	const [isUpdated, setUpdated] = useState(false)
	const [isConnected, setConnected] = useState(true)
	const [appState, setAppState] = useState(AppState.currentState)
	const [nepaliDate, setNepaliDate] = useState('')

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
		let d = new Date()
		let s = d.toISOString()
		s = s.slice(0, 10)
		setNepaliDate(AD2BS(s))
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
						<View>
							<Text style={style.textStyle}>
								{getCurrentDayNameInNepali() +
									', ' +
									getNepaliMonthsInNepali()[
										parseInt(nepaliDate.slice(5, 7)) - 1
									] +
									' ' +
									`${convertNos(
										nepaliDate.slice(8, 9),
									)}${convertNos(nepaliDate.slice(9, 10))}`}
							</Text>
							<Text style={style.timeTextStyle}>
								{getCurrentTime()}
							</Text>
						</View>
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

const style = StyleSheet.create({
	textStyle: {
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
		paddingLeft: 20,
	},
	timeTextStyle: {
		fontWeight: 'bold',
		fontSize: 22,
		paddingTop: 5,
		paddingLeft: 20,
	},
})

export default Home
