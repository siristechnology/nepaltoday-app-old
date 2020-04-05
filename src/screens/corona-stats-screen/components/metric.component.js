import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-ui-kitten'
import numberFormatter from 'format-number'

export default MetricComponent = (props) => {
	const { style, hint, value, ...viewProps } = props

	const isNumbersInK = value > 10000
	let newValue = value
	if (isNumbersInK) newValue = value / 1000

	let formattedNumber = numberFormatter({ round: 0 })(newValue)

	if (isNumbersInK) formattedNumber += 'K'
	return (
		<View {...viewProps} style={[styles.container, style]}>
			<Text category="h5">{formattedNumber}</Text>
			<Text appearance="hint" category="c2">
				{props.hint}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
})
