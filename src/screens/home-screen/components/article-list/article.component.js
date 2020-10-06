import React from 'react'
import { View, TouchableOpacity, ImageBackground } from 'react-native'
import { Avatar, Text } from 'react-native-ui-kitten/ui'
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
						<Text appearance="hint">{article.shortDescription.substring(0, 100)}</Text>
					</View>
				</View>
				<ArticleActivityBar style={themedStyle.activityBar}>
					<Avatar source={{ uri: article.source.logoLink }} size="tiny" />
					<View style={themedStyle.articleSourceName}>
						<Text appearance="hint">{article.source.name}</Text>
					</View>
					<View style={themedStyle.dateContainer}>
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
		marginVertical: 8,
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
		height: 100,
		marginRight: 8,
	},
	image: {
		borderRadius: 6,
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
		marginTop: 4,
	},
	articleSourceName: { marginLeft: 10 },
	dateContainer: {
		marginLeft: 10,
		flexDirection: 'row',
		alignItems: 'center',
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
