import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { convertToNepaliDigit } from '../helper/utils'

const Weather = ({ weather }) => {
	let { temperature } = weather
	if (!temperature) return null

	temperature = Math.ceil(temperature)

	return (
		<View style={styles.weatherContainerStyle}>
			<FontAwesome name="cloud" size={20} />
			<Text style={styles.weatherTextStyle}>
				{convertToNepaliDigit(temperature)} ˚C
			</Text>
		</View>
	)
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
