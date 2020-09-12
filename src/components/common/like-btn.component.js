import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import { HeartIconFill } from '../../assets/icons'

const LikeButtonComponent = (props) => {
	const { style, themedStyle, textStyle, children, ...restProps } = props
	return (
		<TouchableOpacity style={[themedStyle.container, style]} {...restProps}>
			{HeartIconFill(themedStyle.icon)}
			<Text style={[themedStyle.valueLabel, textStyle]} category="p2">
				{children}
			</Text>
		</TouchableOpacity>
	)
}

export const LikeButton = withStyles(LikeButtonComponent, (theme) => ({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		width: 24,
		height: 24,
		tintColor: theme['color-danger-default'],
	},
	valueLabel: {
		marginHorizontal: 8,
	},
}))
