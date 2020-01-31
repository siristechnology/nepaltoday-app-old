import { AppState, Text, StyleSheet, View } from 'react-native'
import Analytics from 'appcenter-analytics'
import React, { useState, useEffect } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { useNetInfo } from '@react-native-community/netinfo'

import environment from '../../environment'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { ArticleListContainer } from '../../layout/article'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import global from '../../../global'
import Weather from '../../components/weather.component'

const Home = ({ navigation, actions }) => {
	const netInfo = useNetInfo()
	const [isUpdated, setUpdated] = useState(false)
	const [isConnected, setConnected] = useState(true)
	const [appState, setAppState] = useState(AppState.currentState)
	const [nepaliDate, setNepaliDate] = useState('')
	const [weatherData, setWeatherData] = useState({})

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
		setNepaliDate(getFormattedCurrentNepaliDate())
		return () => {
			AppState.removeEventListener('change', updateAppState)
		}
	}, [])

	useEffect(() => {
		fetch(global.weatherAPI)
			.then(res => res.json())
			.then(json => {
				setWeatherData({
					temperature: json.main.temp,
					weatherCondition: json.weather[0].main,
					name: json.name,
				})
			})
	})

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
						<View style={style.headerStyle}>
							<Text style={style.textStyle}>{nepaliDate}</Text>
							<Weather weather={weatherData} />
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
	timeTextStyle: {
		fontWeight: 'bold',
		fontSize: 22,
		paddingTop: 5,
		paddingLeft: 20,
	},
})

export default Home
