import React from 'react'
import { View } from 'react-native'
import { withStyles } from 'react-native-ui-kitten/theme'

const ActivityBarComponent = (props) => {
	const { style, themedStyle, children, ...restProps } = props

	return (
		<View style={[themedStyle.container, style]} {...restProps}>
			{children}
		</View>
	)
}

export const ActivityBar = withStyles(ActivityBarComponent, (theme) => ({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}))
