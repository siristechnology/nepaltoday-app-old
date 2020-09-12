import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CountryCard = (props) => {
	const Divider = () => {
		return <View style={styles.divider} />
	}

	const renderStatView = (text, number) => {
		const isNumberInK = number > 10000
		let newValue = number
		if (isNumberInK) {
			newValue = Math.round(number / 1000)
		}
		const formattedValue = (isNumberInK && newValue + 'k') || newValue
		return (
			<View style={styles.statView}>
				<Text style={styles.valueText}>{formattedValue}</Text>
				<Text style={styles.valueTitle}>{text}</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{props.stat.country}</Text>
			<Divider />
			<View style={styles.statContainer}>
				{renderStatView('Total Cases', props.stat.total_cases)}
				{renderStatView('Total Deaths', props.stat.total_deaths)}
				{renderStatView('New Cases', props.stat.new_cases)}
				{renderStatView('New Deaths', props.stat.new_deaths)}
			</View>
		</View>
	)
}

export default CountryCard

const styles = StyleSheet.create({
	container: {
		borderRadius: 8,
		padding: 10,
		margin: 5,
		backgroundColor: '#fff',
		elevation: 0.9,
		marginHorizontal: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		opacity: 0.7,
	},
	divider: {
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '#F5F5F5',
		marginVertical: 10,
	},
	statContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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
