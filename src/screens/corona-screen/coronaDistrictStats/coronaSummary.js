import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CoronaSummary = (props) => {
	const getCommaAddedNumber = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	const Card = (title, number, test) => {
		return (
			<View style={styles.individualCard}>
				<Text testID={test} style={styles.valueText}>{getCommaAddedNumber(number)}</Text>
				<Text style={styles.valueTitle}>{title}</Text>
			</View>
		)
	}

	return (
		<View>
			<View style={styles.rowView}>
				{Card('कुल संक्रमित', props.stats.totalCases, 'totalCase')}
				{Card('नयाँ संक्रमित', props.stats.newCases,'newCase')}
			</View>
			<View style={styles.rowView}>
				{Card('कुल मृत्यु', props.stats.totalDeaths,'totalDeath')}
				{Card('नयाँ मृत्यु', props.stats.newDeaths,'newDeath')}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	rowView: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		marginBottom: 7,
	},
	individualCard: {
		backgroundColor: '#fff',
		elevation: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		paddingHorizontal: 15,
		width: '40%',
		borderRadius: 5,
	},
	valueText: {
		fontSize: 18,
		opacity: 0.9,
	},
	valueTitle: {
		fontSize: 12,
		opacity: 0.8,
	},
})

export default CoronaSummary
