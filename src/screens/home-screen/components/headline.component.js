import React from 'react'
import { ImageBackground, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { withStyles } from '@ui-kitten/components/theme'

import { getRelativeTime } from '../../../helper/time'
import { ArticleActivityBar } from '../../../components/articles'
import { ActivityAuthoring, textStyle } from '../../../components/common'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HeadlineItemComponent = React.memo((props) => {
	const { eva, style, article, ...restProps } = props
	const onPress = () => {
		props.onPress(article)
	}

	return (
		<TouchableOpacity
			testID="headline"
			activeOpacity={0.8} 
			{...restProps} 
			style={[eva.style.container, style]} 
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
			<View style={eva.style.infoContainer}>
				<Text testID="headlineTitle" style={eva.style.titleLabel} category="h5">
					{article.title}
				</Text>
				<Text style={eva.style.descriptionLabel} appearance="hint" category="s1">
					{article.shortDescription ? article.shortDescription.substring(0, 100) + '...' : ''}
				</Text>
			</View>
		</TouchableOpacity>
	)
})

export const HeadlineComponent = withStyles(HeadlineItemComponent, (theme) => ({
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
		borderWidth: 1,
		borderColor: '#e5edf2',
	},
	titleLabel: textStyle.headline,
	descriptionLabel: {
		marginTop: 2,
		...textStyle.subtitle,
	},
}))
