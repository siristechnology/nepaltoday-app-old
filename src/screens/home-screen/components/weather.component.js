import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { StyleSheet, View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { convertToNepaliDigit } from '../../../helper/utils'

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
	const { loading, data, error } = useQuery(FETCH_WEATHER_INFO_QUERY, {
		variables: {},
	})

	if (error) console.log('printing error', error)

	if (!loading && !error && !!data.getWeatherInfo) {
		let { temperature } = data.getWeatherInfo
		if (!temperature) return null

		temperature = Math.ceil(temperature)

		return (
			<View style={styles.weatherContainerStyle}>
				<FontAwesome name="cloud" size={20} />
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
		fontSize: 18,
		marginLeft: 3,
	},
})

export default Weather
