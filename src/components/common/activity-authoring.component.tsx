import React from 'react'
import { StyleSheet, ImageSourcePropType, View, ViewProps, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { textStyle } from '../common/style'

interface ComponentProps {
	photo: ImageSourcePropType
	name: string
	date: string
}

export type ActivitiAuthoringProps = ViewProps & ComponentProps

export class ActivityAuthoring extends React.Component<ActivitiAuthoringProps> {
	public render(): React.ReactNode {
		const { style, photo, name, date, ...restProps } = this.props

		return (
			<View {...restProps} style={[themedStyle.container, style]}>
				<Avatar.Image source={photo} size={24} style={themedStyle.authorPhoto} />
				<View style={themedStyle.authorInfoContainer}>
					<Text style={themedStyle.authorNameLabel}>{name}</Text>
					<Text style={themedStyle.dateLabel} appearance="hint" category="p2">
						{date}
					</Text>
				</View>
			</View>
		)
	}
}

const themedStyle = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	authorInfoContainer: {
		marginLeft: 16,
	},
	authorPhoto: {
		margin: 0,
		borderWidth: 2,
		// backgroundColor: theme['background-basic-color-1'],
		// borderColor: theme['border-basic-color-4'],
	},
	authorNameLabel: textStyle.subtitle,
	dateLabel: textStyle.paragraph,
})
