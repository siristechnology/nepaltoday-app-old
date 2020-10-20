import React from 'react'
import { StyleSheet } from 'react-native'
import { ActivityBar } from '../../components/common'

export const ArticleActivityBar = (props) => {
	const { style, textStyle, likes, children, ...restProps } = props
	return (
		<ActivityBar {...restProps} style={[themedStyle.container, style]}>
			{children}
		</ActivityBar>
	)
}

const themedStyle = StyleSheet.create({
	container: {},
})
