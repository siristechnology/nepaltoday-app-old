import React from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { withStyles } from 'react-native-ui-kitten/theme'
import { Text } from 'react-native-ui-kitten/ui'
import { textStyle } from '../../../components/common/style'

const ArticleListItemComponent = props => {
	const { style, themedStyle, article, ...restProps } = props
	const onPress = () => {
		props.onPress(article)
	}
	const getRelativeTime = date => {
		return moment(Number(date))
			.startOf('hour')
			.fromNow()
	}

	return (
		<TouchableOpacity
			activeOpacity={0.95}
			{...restProps}
			style={[themedStyle.container, style]}
			onPress={onPress}>
			<ImageBackground
				style={themedStyle.image}
				source={{ uri: article.imageLink }}
			/>
			<View style={themedStyle.infoContainer}>
				<Text style={themedStyle.titleLabel} category="h5">
					{article.title}
				</Text>
				<Text
					style={themedStyle.descriptionLabel}
					appearance="hint"
					category="s1">
					{article.shortDescription}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export const ArticleListItem = withStyles(ArticleListItemComponent, theme => ({
	container: {
		borderRadius: 12,
	},
	infoContainer: {
		paddingHorizontal: 16,
		paddingVertical: 24,
		borderBottomWidth: 1,
		borderBottomColor: theme['border-basic-color-2'],
	},
	activityContainer: {
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	image: {
		height: 220,
	},
	titleLabel: textStyle.headline,
	descriptionLabel: {
		marginTop: 16,
		...textStyle.subtitle,
	},
}))
