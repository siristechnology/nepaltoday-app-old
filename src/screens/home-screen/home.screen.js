import {
	AppState,
	Text,
	StyleSheet,
	View,
	PermissionsAndroid,
} from 'react-native'
import Analytics from 'appcenter-analytics'
import React, { useState, useEffect } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import Geolocation from 'react-native-geolocation-service'

import environment from '../../environment'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { ArticleListContainer } from '../../layout/article'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import Weather from '../../components/weather.component'
import { WEATHER_API_APPID } from 'react-native-dotenv'

const Home = ({ navigation, actions }) => {
	const [isUpdated, setUpdated] = useState(false)
	const [appState, setAppState] = useState(AppState.currentState)
	const [nepaliDate, setNepaliDate] = useState('')
	const [weatherData, setWeatherData] = useState({})

	const handleRefresh = () => {
		setUpdated(!isUpdated)
	}

	const updateAppState = nextAppState => {
		if (
			appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			handleRefresh()
		}
		setAppState(nextAppState)
	}

	const checkLocationAccess = async () => {
		const hasPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		)
		if (hasPermission) return true

		const status = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		)

		if (status === PermissionsAndroid.RESULTS.GRANTED) return true

		return false
	}

	const getLocation = async () => {
		const hasLocationPermission = await checkLocationAccess()

		if (!hasLocationPermission) return

		Geolocation.getCurrentPosition(
			position => {
				console.log('_________location_detail________', position)
				fetchWeather(
					position.coords.latitude,
					position.coords.longitude,
				)
			},
			error => {
				console.log('__________location_error_______', error)
			},
			{
				enableHighAccuracy: true,
				timeout: 15000,
				maximumAge: 3600000,
				distanceFilter: 50,
				forceRequestLocation: true,
			},
		)
	}

	useEffect(() => {
		Analytics.trackEvent('Home page loaded')
		AppState.addEventListener('change', updateAppState)
		setNepaliDate(getFormattedCurrentNepaliDate())
		return () => {
			AppState.removeEventListener('change', updateAppState)
		}
	}, [])

	const fetchWeather = async (latitude = 10, longitude = 10) => {
		let response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_API_APPID}&units=metric`,
		)

		let json = await response.json()
		console.log('__________weather_data___________', json)

		setWeatherData({
			temperature: json.main.temp,
			weatherCondition: json.weather[0].main,
			name: json.name,
		})
	}

	useEffect(() => {
		getLocation()
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
