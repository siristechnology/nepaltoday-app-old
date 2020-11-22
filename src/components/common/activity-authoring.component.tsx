import React from 'react'
import { ImageSourcePropType, View, ViewProps } from 'react-native'
import { Text } from '@ui-kitten/components'
import { ThemedComponentProps, ThemeType, withStyles } from '@ui-kitten/components'
import { Avatar } from '@ui-kitten/components'
import { textStyle } from '../common/style'

interface ComponentProps {
	photo: ImageSourcePropType
	name: string
	date: string
}

export type ActivitiAuthoringProps = ThemedComponentProps & ViewProps & ComponentProps

class ActivityAuthoringComponent extends React.Component<ActivitiAuthoringProps> {
	public render(): React.ReactNode {
		const { eva, style, photo, name, date, ...restProps } = this.props

		return (
			<View {...restProps} style={[eva.style.container, style]}>
				<Avatar style={eva.style.authorPhoto} source={photo} />
				<View style={eva.style.authorInfoContainer}>
					<Text style={eva.style.authorNameLabel}>{name}</Text>
					<Text style={eva.style.dateLabel} appearance="hint" category="p2">
						{date}
					</Text>
				</View>
			</View>
		)
	}
}

export const ActivityAuthoring = withStyles(ActivityAuthoringComponent, (theme: ThemeType) => ({
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
		backgroundColor: theme['background-basic-color-1'],
		borderColor: theme['border-basic-color-4'],
	},
	authorNameLabel: textStyle.subtitle,
	dateLabel: textStyle.paragraph,
}))
