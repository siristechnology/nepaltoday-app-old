import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { convertToNepaliDigit } from '../../../helper/utils'
import crashlytics from '@react-native-firebase/crashlytics'
import { useTheme, Text } from 'react-native-paper'

export const FETCH_WEATHER_INFO_QUERY = gql`
	query getWeatherInfo {
		getWeatherInfo {
			temperature
			condition
			description
			place
		}
	}
`

const Weather = () => {
	
	const getWeatherIcon = (condition) => {
		if(condition=='Thunderstorm'){
			return 'weather-lightning'
		}else if(condition=='Drizzle' || condition=='Rain'){
			return 'weather-rainy'
		}else if(condition=='Snow'){
			return 'weather-snowy'
		}else if(condition=='Mist' || condition=='Smoke' || condition=='Haze' || condition=='Dust' || condition=='Fog' || condition=='Sand'){
			return 'weather-fog'
		}else if(condition=='Clouds'){
			return 'weather-cloudy'
		}else{
			return 'weather-sunny'
		}
	}

	let { loading, data, error } = useQuery(FETCH_WEATHER_INFO_QUERY, {
		variables: {},
	})

	data = {"getWeatherInfo": {
		"temperature": 23.43,
		"condition": "Clear",
		"description": "clear sky"
	  }
	}
	if (error) {
		crashlytics().recordError(new Error('Weather Api error' + error.message))
	}

	const theme = useTheme()

	if (!loading && !error && !!data.getWeatherInfo) {
		let { temperature, condition } = data.getWeatherInfo
		if (!temperature) return null

		temperature = Math.ceil(temperature)

		return (
			<View testID="weatherComponent" style={styles.weatherContainerStyle}>
				<Icon 
					name={getWeatherIcon(condition)} 
					size={18}
					color={theme.colors.secondary} 
				/>
				<Text style={styles.weatherTextStyle}>{convertToNepaliDigit(temperature)} ˚C</Text>
			</View>
		)
	} else {
		return null
	}
}

const styles = StyleSheet.create({
	weatherContainerStyle: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	weatherTextStyle: {
		fontWeight: 'bold',
		fontSize: 16,
		marginLeft: 3,
	},
})

export default Weather
