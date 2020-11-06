import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { formatCoronaNumber } from '../../../helper/numberFormatter'

const DistrictCard = (props) => {
	const renderStatView = (text, number, test) => {
		const formattedValue = formatCoronaNumber(number)

		return (
			<View style={styles.statView}>
				<Text testID={test+props.stat.name} style={styles.valueText}>{formattedValue}</Text>
				<Text style={styles.valueTitle}>{text}</Text>
			</View>
		)
	}

	return (
		<View testID={"district"+props.index} style={styles.container}>
			<Text style={styles.title}>{props.index+1}. {props.stat.nepaliName}</Text>
			<View style={styles.statContainer}>
				{renderStatView('कुल संक्रमित', props.stat.totalCases, 'districtTotal')}
				{renderStatView('नयाँ संक्रमित', props.stat.newCases, 'districtNew')}
			</View>
			{/* <View style={styles.divider} /> */}
		</View>
	)
}

export default DistrictCard

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
		justifyContent: 'space-evenly',
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
