import React from 'react'
import { withStyles } from '@ui-kitten/components'

import { ActivityBar } from '../../components/common'

const ArticleActivityBarComponent = (props) => {
	const { eva, style, textStyle, likes, children, ...restProps } = props
	return (
		<ActivityBar {...restProps} style={[eva.style.container, style]}>
			{children}
		</ActivityBar>
	)
}

export const ArticleActivityBar = withStyles(ArticleActivityBarComponent, (theme) => ({}))
