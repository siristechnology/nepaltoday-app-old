import React from 'react'
import { View, TouchableOpacity, Linking } from 'react-native'
import { Avatar, Text } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import { textStyle } from '../../components/common'
import { ArticleActivityBar } from '../../components/articles'
import { ClockIconOutline } from '../../assets/icons'
import { getRelativeTime } from '../../helper/time'

const TwitterListItemComponent = props => {
	const { style, themedStyle, tweet, ...restProps } = props
	const handlePress = () => {
		const handle = tweet.handle || tweet.twitterHandle.handle
		const link = `https://twitter.com/${handle}/status/${tweet.tweetId}`
		Linking.openURL(link).catch(error => {
			throw new Error('Error opening twitter' + error)
		})
	}

	return (
		<TouchableOpacity
			activeOpacity={0.95}
			{...restProps}
			style={[themedStyle.container]}
			onPress={handlePress}>
			<View style={themedStyle.tweetWrapper}>
				<View style={themedStyle.headerWrapper}>
					<Avatar
						source={{ uri: tweet.profileImage }}
						style={themedStyle.avatar}
					/>
					<View style={themedStyle.handleWrapper}>
						<Text style={themedStyle.titleLabel} category="h6">
							{tweet.name}
						</Text>
						<Text
							style={themedStyle.descriptionLabel}
							appearance="hint"
							category="s1">
							{tweet.twitterHandle.handle}
						</Text>
					</View>
				</View>
				<Text>{tweet.text}</Text>
				<ArticleActivityBar style={themedStyle.detailsContainer}>
					<View style={themedStyle.dateContainer}>
						{ClockIconOutline(themedStyle.dateIcon)}
						<Text
							style={themedStyle.dateLabel}
							appearance="hint"
							category="p2">
							{getRelativeTime(tweet.publishedDate)}
						</Text>
					</View>
				</ArticleActivityBar>
			</View>
		</TouchableOpacity>
	)
}

export const TwitterListItem = withStyles(TwitterListItemComponent, theme => ({
	container: {
		borderRadius: 4,
		marginVertical: 2,
		backgroundColor: '#FFFFFF',
	},
	tweetWrapper: {
		padding: 4,
	},
	headerWrapper: {
		flexDirection: 'row',
		padding: 4,
		alignItems: 'center',
	},
	avatar: {
		marginRight: 8,
	},
	handleWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	titleLabel: textStyle.label,
	descriptionLabel: {
		marginLeft: 4,
		...textStyle.subtitle,
	},
	detailsContainer: {
		paddingTop: 2,
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	dateLabel: {
		marginLeft: 8,
		...textStyle.paragraph,
	},
	dateIcon: {
		width: 12,
		height: 12,
		tintColor: theme['text-hint-color'],
	},
}))
