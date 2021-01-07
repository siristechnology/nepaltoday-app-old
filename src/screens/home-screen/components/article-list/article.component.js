import React from 'react'
import { View, TouchableOpacity, ImageBackground } from 'react-native'
import { Avatar, Text } from '@ui-kitten/components'
import { withStyles } from '@ui-kitten/components/theme'

import { textStyle } from '../../../../components/common'
import { ArticleActivityBar } from '../../../../components/articles'
import { ClockIconOutline } from '../../../../assets/icons'
import { getRelativeTime } from '../../../../helper/time'
import { IconButton, useTheme } from 'react-native-paper'

const ArticleListItemCompoent = (props) => {
	const { eva, article, style, isRead, index } = props
	const onPress = () => {
		props.onPress(article)
	}

	const onMoreIconPress = (article) => {
		props.onShowMoreModal(article)
	}

	const theme = useTheme()

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			style={[eva.style.container, style, { backgroundColor: isRead && theme.colors.lightBackground || theme.colors.primary }]}
		>
			<View style={[eva.style.container, { backgroundColor: isRead &&  theme.colors.lightBackground || theme.colors.primary }]}>
				<View style={eva.style.articleWrapper}>
					<View style={eva.style.leftWrapper}>
						<ImageBackground style={eva.style.imageContainer} imageStyle={eva.style.image} source={{ uri: article.imageLink }} />
					</View>
					<View style={eva.style.rightWrapper}>
						<View style={eva.style.headerWrapper}>
							<Text testID={'homeArticle' + index} style={eva.style.titleLabel} category="h6">
								{article.title}
							</Text>
						</View>
						<Text appearance="hint">{article.shortDescription ? article.shortDescription.substring(0, 100) + '...' : ''}</Text>
					</View>
				</View>
				<ArticleActivityBar style={eva.style.activityBar}>
					<View style={eva.style.bottomRowView}>
						<View style={eva.style.activityBarContent}>
							<Avatar source={{ uri: article.source.logoLink }} size="tiny" />
							<View style={eva.style.articleSourceName}>
								<Text appearance="hint">{article.source.name}</Text>
							</View>
						</View>
						<View style={eva.style.activityBarContent}>
							{ClockIconOutline(eva.style.dateIcon)}
							<Text style={eva.style.dateLabel} appearance="hint" category="p2">
								{getRelativeTime(article.createdDate)}
							</Text>
						</View>
					</View>
					<IconButton 
						icon="dots-vertical"
						size={22}
						onPress={()=>onMoreIconPress(article)}
					/>
				</ArticleActivityBar>
			</View>
		</TouchableOpacity>
	)
}

export const ArticleListItem = withStyles(ArticleListItemCompoent, (theme) => ({
	container: {
		marginVertical: 4,
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
		justifyContent: 'space-between',
		marginTop: 8,
	},
	bottomRowView: {
		alignItems: 'center',
		flexDirection: 'row'
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
