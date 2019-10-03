import React from 'react'
import { withStyles } from 'react-native-ui-kitten/theme'

import { ActivityBar } from '../../components/common'

const ArticleActivityBarComponent = props => {
	const { themedStyle, textStyle, likes, children, ...restProps } = props
	return <ActivityBar {...restProps}>{children}</ActivityBar>
}

export const ArticleActivityBar = withStyles(
	ArticleActivityBarComponent,
	theme => ({}),
)
