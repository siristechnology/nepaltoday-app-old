import React from 'react'
import { View, TouchableOpacity, ImageBackground } from 'react-native'
import { Avatar, Text } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import { textStyle } from '../../../../components/common'
import { ArticleActivityBar } from '../../../../components/articles'
import { ClockIconOutline } from '../../../../assets/icons'
import { getRelativeTime } from '../../../../helper/time'

const ArticleListItemCompoent = (props) => {
	const { article, themedStyle, style, isRead, index } = props
	const onPress = () => {
		props.onPress(article)
	}

	return (
		<TouchableOpacity testID={"homeArticle"+index} onPress={onPress} activeOpacity={0.8} style={[themedStyle.container, style, isRead && {backgroundColor:'#F5F5F5'}]}>
			<View style={[themedStyle.container, isRead && {backgroundColor: '#F5F5F5'}]}>
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
						<Text appearance="hint">{article.shortDescription ? article.shortDescription.substring(0, 100) + '...' : ''}</Text>
					</View>
				</View>
				<ArticleActivityBar style={themedStyle.activityBar}>
					<View style={themedStyle.activityBarContent}>
						<Avatar source={{ uri: article.source.logoLink }} size="tiny" />
						<View style={themedStyle.articleSourceName}>
							<Text appearance="hint">{article.source.name}</Text>
						</View>
					</View>
					<View style={themedStyle.activityBarContent}>
						{ClockIconOutline(themedStyle.dateIcon)}
						<Text style={themedStyle.dateLabel} appearance="hint" category="p2">
							{getRelativeTime(article.createdDate)}
						</Text>
					</View>
				</ArticleActivityBar>
			</View>
		</TouchableOpacity>
	)
}

export const ArticleListItem = withStyles(ArticleListItemCompoent, (theme) => ({
	container: {
		marginVertical: 4,
		backgroundColor: '#FFFFFF',
	},
	articleWrapper: {
		flexDirection: 'row',
	},
	leftWrapper: {
		width: '35%',
	},
	rightWrapper: {
		flex: 1,
		marginLeft: 8,
	},
	imageContainer: {
		height: 110,
		marginRight: 8,
	},
	image: {
		borderRadius: 6,
		marginTop: 4,
		borderWidth: 1,
		borderColor: '#e5edf2',
	},
	headerWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 4,
		alignItems: 'center',
	},
	titleLabel: {
		...textStyle.caption2,
	},
	activityBar: {
		justifyContent: 'flex-start',
		marginTop: 8,
	},
	articleSourceName: { marginLeft: 4 },
	activityBarContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 8,
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
