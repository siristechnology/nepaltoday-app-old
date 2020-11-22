import React from 'react'
import { View } from 'react-native'
import { withStyles } from '@ui-kitten/components'

const ActivityBarComponent = (props) => {
	const { eva, style, children, ...restProps } = props

	return (
		<View style={[eva.style.container, style]} {...restProps}>
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
