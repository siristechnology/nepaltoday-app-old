import React from 'react'
import { Text } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'
import { ImageBackground, View } from 'react-native'

import { getRelativeTime } from '../../../helper/time'
import { ArticleActivityBar } from '../../../components/articles'
import { ActivityAuthoring, textStyle } from '../../../components/common'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ArticleListItemComponent = React.memo((props) => {
	const { style, themedStyle, article, ...restProps } = props
	const onPress = () => {
		props.onPress(article)
	}

	return (
		<TouchableOpacity activeOpacity={0.8} {...restProps} style={[themedStyle.container, style]} onPress={onPress}>
			<ImageBackground style={themedStyle.imageContainer} imageStyle={themedStyle.image} source={{ uri: article.imageLink }} />
			<ArticleActivityBar style={themedStyle.activityContainer}>
				<ActivityAuthoring
					photo={{ uri: article.source.logoLink }}
					name={`${article.source.name}`}
					date={getRelativeTime(article.createdDate)}
				/>
			</ArticleActivityBar>
			<View style={themedStyle.infoContainer}>
				<Text style={themedStyle.titleLabel} category="h5">
					{article.title}
				</Text>
				<Text style={themedStyle.descriptionLabel} appearance="hint" category="s1">
					{article.shortDescription ? article.shortDescription.substring(0, 100) + '...' : ''}
				</Text>
			</View>
		</TouchableOpacity>
	)
})

export const ArticleListItem = withStyles(ArticleListItemComponent, (theme) => ({
	container: {
		borderRadius: 8,
	},
	infoContainer: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginTop: -12
	},
	activityContainer: {
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	imageContainer: {
		height: 220,
	},
	image: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	titleLabel: textStyle.headline,
	descriptionLabel: {
		marginTop: 2,
		...textStyle.subtitle,
	},
}))
