import React from 'react'
import { Text } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'
import { ImageBackground, TouchableOpacity, View } from 'react-native'

import { getRelativeTime } from '../../../helper/time'
import { ArticleActivityBar } from '../../../components/articles'
import { ActivityAuthoring, textStyle } from '../../../components/common'

const ArticleListItemComponent = props => {
	const { style, themedStyle, article, ...restProps } = props
	const onPress = () => {
		props.onPress(article)
	}

	return (
		<TouchableOpacity
			activeOpacity={0.95}
			{...restProps}
			style={[themedStyle.container, style]}
			onPress={onPress}>
			<ImageBackground
				style={themedStyle.imageContainer}
				imageStyle={themedStyle.image}
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
			<ArticleActivityBar style={themedStyle.activityContainer}>
				<ActivityAuthoring
					photo={{ uri: article.source.logoLink }}
					name={`${article.source.name}`}
					date={getRelativeTime(article.publishedDate)}
				/>
			</ArticleActivityBar>
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
	imageContainer: {
		height: 220,
	},
	image: {
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	titleLabel: textStyle.headline,
	descriptionLabel: {
		marginTop: 16,
		...textStyle.subtitle,
	},
}))
