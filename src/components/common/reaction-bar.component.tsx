import React from 'react'
import { View, ViewProps } from 'react-native'
import { ThemedComponentProps, withStyles } from '@ui-kitten/components/theme'

type ChildElement = React.ReactElement<any>

interface ComponentProps {
	children: ChildElement | ChildElement[]
}

export type ReactionBarProps = ThemedComponentProps & ViewProps & ComponentProps

class ReactionBarComponent extends React.Component<ReactionBarProps> {
	public render(): React.ReactNode {
		const { eva, style, ...restProps } = this.props

		return <View {...restProps} style={[eva.style.container, style]} />
	}
}

export const ReactionBar = withStyles(ReactionBarComponent, () => ({
	container: {
		flexDirection: 'row',
	},
}))
