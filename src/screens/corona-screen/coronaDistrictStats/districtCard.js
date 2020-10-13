import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { formatCoronaNumber } from '../../../helper/numberFormatter'

const DistrictCard = (props) => {
	const renderStatView = (text, number) => {
		const formattedValue = formatCoronaNumber(number)

		return (
			<View style={styles.statView}>
				<Text style={styles.valueText}>{formattedValue}</Text>
				<Text style={styles.valueTitle}>{text}</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{props.stat.nepaliName}</Text>
			<View style={styles.statContainer}>
				{renderStatView('Total Cases', props.stat.totalCases)}
				{renderStatView('New Cases', props.stat.newCases)}
			</View>
			<View style={styles.divider} />
		</View>
	)
}

export default DistrictCard

const styles = StyleSheet.create({
	container: {
		padding: 4,
		margin: 5,
		marginHorizontal: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		opacity: 0.7,
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: '#F5F0F0',
		marginVertical: 10,
	},
	statContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingVertical: 5,
	},
	statView: {
		alignItems: 'center',
		justifyContent: 'center',
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
