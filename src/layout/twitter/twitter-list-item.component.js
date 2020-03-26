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
				<View style={themedStyle.leftWrapper}>
					<Avatar
						source={{ uri: tweet.profileImage }}
						style={themedStyle.avatar}
						size="giant"
					/>
				</View>
				<View style={themedStyle.rightWrapper}>
					<View style={themedStyle.headerWrapper}>
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
					<View>
						<Text>{tweet.text}</Text>
					</View>
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
			</View>
		</TouchableOpacity>
	)
}

export const TwitterListItem = withStyles(TwitterListItemComponent, theme => ({
	container: {
		marginVertical: 1,
		backgroundColor: '#FFFFFF',
	},
	tweetWrapper: {
		padding: 4,
		marginVertical: 6,
		flexDirection: 'row',
	},
	rightWrapper: {
		flex: 1,
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
		marginLeft: 4,
		...textStyle.paragraph,
	},
	dateIcon: {
		width: 16,
		height: 16,
		tintColor: theme['text-hint-color'],
	},
}))
