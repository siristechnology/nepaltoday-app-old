import React from 'react'
import { View, StyleSheet } from 'react-native'
import { formatCoronaNumber } from '../../../helper/numberFormatter'
import { Text, useTheme } from 'react-native-paper'

const CountryCard = (props) => {
	const renderStatView = (text, number, test) => {
		const formattedValue = formatCoronaNumber(number)

		return (
			<View style={styles.statView}>
				<Text testID={test+props.stat.country} style={styles.valueText}>{formattedValue}</Text>
				<Text style={styles.valueTitle}>{text}</Text>
			</View>
		)
	}

	const theme = useTheme()

	return (
		<View 
			style={[styles.container,{backgroundColor: theme.colors.primary}]}
		>
			<Text style={styles.title}>{props.index+1}. {props.stat.country}</Text>
			<View style={styles.statContainer}>
				{renderStatView('कुल संक्रमित', props.stat.total_cases, 'worldTotalCase')}
				{renderStatView('कुल मृत्यु', props.stat.total_deaths)}
				{renderStatView('नयाँ संक्रमित', props.stat.new_cases)}
				{renderStatView('नयाँ मृत्यु', props.stat.new_deaths)}
			</View>
			{/* <View style={styles.divider} /> */}
		</View>
	)
}

export default CountryCard

const styles = StyleSheet.create({
	container: {
		padding: 4,
		margin: 4,
		marginHorizontal: 10,
		elevation: 0.5,
		backgroundColor: '#FAFAFA',
		borderRadius: 5
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
		justifyContent: 'space-between',
		paddingVertical: 3,
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
