import React from 'react'
import { ImageBackground, View, TouchableOpacity } from 'react-native'
import { Text } from '@ui-kitten/components'
import { withStyles } from '@ui-kitten/components/theme'

import { getRelativeTime } from '../../../helper/time'
import { ArticleActivityBar } from '../../../components/articles'
import { ActivityAuthoring, textStyle } from '../../../components/common'
import { useTheme } from 'react-native-paper'

const ArticleListItemComponent = React.memo((props) => {
	const { eva, style, article, isRead, index, ...restProps } = props
	const onPress = () => {
		props.onPress(article)
	}

	const theme = useTheme()

	return (
		<TouchableOpacity
			testID={'headlineArticle' + index}
			activeOpacity={0.8}
			{...restProps}
			style={[eva.style.container, style, isRead && { backgroundColor: theme.colors.lightBackground }]}
			onPress={onPress}
		>
			<ImageBackground style={eva.style.imageContainer} imageStyle={eva.style.image} source={{ uri: article.imageLink }} />
			<ArticleActivityBar style={eva.style.activityContainer}>
				<ActivityAuthoring
					photo={{ uri: article.source.logoLink }}
					name={`${article.source.name}`}
					date={getRelativeTime(article.createdDate)}
				/>
			</ArticleActivityBar>
			{article.category != 'cartoon' && (
				<View style={eva.style.infoContainer}>
					<Text style={eva.style.titleLabel} category="h5">
						{article.title}
					</Text>
					<Text style={eva.style.descriptionLabel} appearance="hint" category="s1">
						{article.shortDescription ? article.shortDescription.substring(0, 100) + '...' : ''}
					</Text>
				</View>
			)}
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
		marginTop: -12,
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
