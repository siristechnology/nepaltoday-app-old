import React from 'react'
import { StyleSheet, View } from 'react-native'

export const ActivityBar = (props) => {
	const { style, children, ...restProps } = props

	return (
		<View style={[themedStyle.container, style]} {...restProps}>
			{children}
		</View>
	)
}

const themedStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})
