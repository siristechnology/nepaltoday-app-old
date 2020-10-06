import React from 'react'
import { View, TouchableOpacity, ImageBackground } from 'react-native'
import { Text } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import { textStyle } from '../../../../components/common'
import { ArticleActivityBar } from '../../../../components/articles'
import { ClockIconOutline } from '../../../../assets/icons'
import { getRelativeTime } from '../../../../helper/time'

const ArticleListItemCompoent = (props) => {
	const { article, themedStyle, style } = props

	const onPress = () => {
		props.onPress(article)
	}

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[themedStyle.container, style]}>
			<View style={[themedStyle.container]}>
				<View style={themedStyle.articleWrapper}>
					<View style={themedStyle.leftWrapper}>
						<ImageBackground style={themedStyle.imageContainer} imageStyle={themedStyle.image} source={{ uri: article.imageLink }} />
					</View>
					<View style={themedStyle.rightWrapper}>
						<View style={themedStyle.headerWrapper}>
							<Text style={themedStyle.titleLabel} category="h6">
								{article.title}
							</Text>
						</View>
						<Text>{article.shortDescription.substring(0, 100)}</Text>
						<ArticleActivityBar style={themedStyle.detailsContainer}>
							<View style={themedStyle.dateContainer}>
								{ClockIconOutline(themedStyle.dateIcon)}
								<Text style={themedStyle.dateLabel} appearance="hint" category="p2">
									{getRelativeTime(article.createdDate)}
								</Text>
							</View>
						</ArticleActivityBar>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export const ArticleListItem = withStyles(ArticleListItemCompoent, (theme) => ({
	container: {
		marginVertical: 0.5,
		backgroundColor: '#FFFFFF',
	},
	imageContainer: {
		height: 100,
		margin: 10,
	},
	image: {
		borderRadius: 8,
	},
	articleWrapper: {
		padding: 4,
		marginVertical: 6,
		flexDirection: 'row',
	},
	leftWrapper: {
		width: '35%',
	},
	rightWrapper: {
		flex: 1,
		margin: 4,
	},
	headerWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 4,
		alignItems: 'center',
	},
	avatar: {
		minWidth: 40,
		margin: 10,
	},
	titleLabel: {
		...textStyle.caption1,
		fontWeight: 'bold',
	},
	descriptionLabel: {
		marginLeft: 4,
		...textStyle.subtitle,
	},
	detailsContainer: {
		paddingTop: 2,
	},
	tweetText: {
		flex: 1,
		flexWrap: 'wrap',
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
	},
	dateLabel: {
		marginLeft: 2,
		...textStyle.paragraph,
	},
	dateIcon: {
		width: 12,
		height: 12,
		marginBottom: -1,
		tintColor: theme['text-hint-color'],
	},
}))
