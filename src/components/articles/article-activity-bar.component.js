import React from 'react'
import { withStyles } from 'react-native-ui-kitten/theme'

import { ActivityBar } from '../../components/common'

const ArticleActivityBarComponent = (props) => {
	const { style, themedStyle, textStyle, likes, children, ...restProps } = props
	return (
		<ActivityBar {...restProps} style={[themedStyle.container, style]}>
			{children}
		</ActivityBar>
	)
}

export const ArticleActivityBar = withStyles(ArticleActivityBarComponent, (theme) => ({}))
