import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, withStyles } from '@ui-kitten/components'

import { HeartIconFill } from '../../assets/icons'

const LikeButtonComponent = (props) => {
	const { eva, style, textStyle, children, ...restProps } = props
	return (
		<TouchableOpacity style={[eva.style.container, style]} {...restProps}>
			{HeartIconFill(eva.style.icon)}
			<Text style={[eva.style.valueLabel, textStyle]} category="p2">
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
