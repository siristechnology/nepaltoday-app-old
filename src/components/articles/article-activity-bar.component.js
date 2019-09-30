import React from 'react'
import { withStyles } from 'react-native-ui-kitten/theme'
import { View } from 'react-native'
// import { ActivityBar, LikeButton, ReactionBar } from '../../components/common'

const ArticleActivityBarComponent = props => {
	const { themedStyle, textStyle, likes, children, ...restProps } = props
	return (
		// <ActivityBar {...restProps}>
		// 	{children}
		// 	<ReactionBar>
		// 		<LikeButton textStyle={textStyle} activeOpacity={0.75}>
		// 			{`${likes || 0}`}
		// 		</LikeButton>
		// 	</ReactionBar>
		// </ActivityBar>
		<View />
	)
}

export const ArticleActivityBar = withStyles(
	ArticleActivityBarComponent,
	theme => ({}),
)
