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
		let d = new Date()
		let s = d.toISOString()
		s = s.slice(0, 10)
		setNepaliDate(AD2BS(s))
		return () => {
			AppState.removeEventListener('change', updateAppState)
		}
	}, [])

	useEffect(() => {
		fetch(
			'http://api.openweathermap.org/data/2.5/weather?lat=27.700769&lon=85.300140&APPID=25e02e338ce3a39c75e5f2595a881e3d&units=metric',
		)
			.then(res => res.json())
			.then(json => {
				setWeatherData({
					temperature: json.main.temp,
					weatherCondition: json.weather[0].main,
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
							<Text style={style.weatherStyle}>
								{weatherData.temperature} degree,{' '}
								{weatherData.weatherCondition}
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
	headerStyle: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	textStyle: {
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
	},
	weatherStyle: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	timeTextStyle: {
		fontWeight: 'bold',
		fontSize: 22,
		paddingTop: 5,
		paddingLeft: 20,
	},
})

export default Home
