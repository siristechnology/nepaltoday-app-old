import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { Text } from 'react-native-ui-kitten'

export default MetricComponent = (props) => {
	const { style, hint, value, ...viewProps } = props

	return (
		<View {...viewProps} style={[styles.container, style]}>
			<Text category="h5">{value}</Text>
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
