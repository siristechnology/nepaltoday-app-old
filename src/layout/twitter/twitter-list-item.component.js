import React from 'react'
import { View, TouchableOpacity, Linking } from 'react-native'
import { Avatar, Text } from '@ui-kitten/components'
import { withStyles } from '@ui-kitten/components/theme'

import { textStyle } from '../../components/common'
import { ArticleActivityBar } from '../../components/articles'
import { ClockIconOutline } from '../../assets/icons'
import { getRelativeTime } from '../../helper/time'
import { useTheme } from 'react-native-paper'

const TwitterListItemComponent = (props) => {
	const { eva, tweet, index } = props

	const handleTwitterHandlePress = () => {
		const handle = tweet.handle
		const link = `https://twitter.com/${handle}/status/${tweet.tweetId}`
		Linking.openURL(link).catch((error) => {
			throw new Error('Error opening twitter' + error)
		})
	}

	const theme = useTheme()

	return (
		<View style={[eva.style.container,{backgroundColor: theme.colors.background}]}>
			<View testID={'twitter' + index} style={eva.style.tweetWrapper}>
				<TouchableOpacity onPress={handleTwitterHandlePress} style={eva.style.leftWrapper} activeOpacity={0.8}>
					<Avatar source={{ uri: tweet.profileImage }} style={eva.style.avatar} size="giant" />
				</TouchableOpacity>
				<View style={eva.style.rightWrapper}>
					<View style={eva.style.headerWrapper}>
						<Text style={eva.style.titleLabel} category="h6">
							{tweet.name}
						</Text>
						<Text style={eva.style.descriptionLabel} appearance="hint" category="s1">
							{tweet.handle}
						</Text>
					</View>
					<Text>{tweet.text}</Text>
					<ArticleActivityBar style={eva.style.detailsContainer}>
						<View style={eva.style.dateContainer}>
							{ClockIconOutline(eva.style.dateIcon)}
							<Text style={eva.style.dateLabel} appearance="hint" category="p2">
								{getRelativeTime(tweet.publishedDate)}
							</Text>
						</View>
					</ArticleActivityBar>
				</View>
			</View>
		</View>
	)
}

export const TwitterListItem = withStyles(TwitterListItemComponent, (theme) => ({
	container: {
		marginVertical: 0.2,
		// backgroundColor: '#FFFFFF',
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
		borderWidth: 1,
		borderColor: '#d5e7f2',
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
