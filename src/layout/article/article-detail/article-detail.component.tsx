import React from 'react'
import { ImageBackground, View } from 'react-native'
import {
	ThemedComponentProps,
	ThemeType,
	withStyles,
} from 'react-native-ui-kitten/theme'
import { Avatar, Text, Button } from 'react-native-ui-kitten/ui'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { getRelativeTime } from '../../../helper/time'
import { ClockIconOutline } from '../../../assets/icons'
import { ArticleActivityBar } from '../../../components/articles'
import { ContainerView, textStyle } from '../../../components/common'

interface ComponentProps {
	article
	navigation: any
	onCommentPress: () => void
	onLikePress: () => void
}

export type ArticleDetailComponentProps = ThemedComponentProps & ComponentProps

class ArticleDetailComponent extends React.Component<
	ArticleDetailComponentProps
> {
	private onCommentButtonPress = () => {
		this.props.onCommentPress()
	}

	private onLikeButtonPress = () => {
		this.props.onLikePress()
	}

	private navigateBack = () => {
		this.props.navigation.goBack()
	}

	public render(): React.ReactNode {
		const { themedStyle, article } = this.props
		const BackIcon = (
			<FontAwesome
				name="arrow-left"
				size={24}
				color="grey"
				onPress={this.navigateBack}
				style={{
					padding: 8,
					paddingLeft: 16,
				}}
			/>
		)

		return (
			<ContainerView style={themedStyle.container}>
				<View style={themedStyle.backIconContainer}>{BackIcon}</View>
				<ImageBackground
					style={themedStyle.image}
					source={{ uri: article.imageLink }}>
					<Avatar
						style={themedStyle.authorPhoto}
						size="large"
						source={{ uri: article.source.logoLink }}
					/>
				</ImageBackground>

				<Text style={themedStyle.titleLabel} category="h5">
					{article.title}
				</Text>
				<Text category="s1" style={themedStyle.contentLabel}>
					{article.content}
				</Text>
				<ArticleActivityBar
					style={themedStyle.detailsContainer}
					comments={article.comments ? article.comments.length : 0}
					likes={article.likes}
					onCommentPress={this.onCommentButtonPress}
					onLikePress={this.onLikeButtonPress}>
					<View style={themedStyle.dateContainer}>
						{ClockIconOutline(themedStyle.dateIcon)}
						<Text
							style={themedStyle.dateLabel}
							appearance="hint"
							category="p2">
							{getRelativeTime(article.publishedDate)}
						</Text>
					</View>
				</ArticleActivityBar>
			</ContainerView>
		)
	}
}

export const ArticleDetail = withStyles(
	ArticleDetailComponent,
	(theme: ThemeType) => ({
		container: {
			flex: 1,
			backgroundColor: theme['background-basic-color-1'],
		},
		detailsContainer: {
			paddingHorizontal: 24,
			paddingVertical: 24,
			borderTopWidth: 1,
			borderTopColor: theme['border-basic-color-2'],
		},
		dateContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		image: {
			minHeight: 175,
		},
		authorPhoto: {
			position: 'absolute',
			left: 24,
			bottom: -32,
			margin: 0,
			borderWidth: 2,
			borderColor: theme['border-basic-color-2'],
		},
		titleLabel: {
			marginHorizontal: 24,
			marginTop: 48,
			...textStyle.headline,
		},
		translatedLabel: {
			flex: 1,
		},
		englishLabel: {
			flex: 1,
			color: '#dadfe3',
		},
		contentLabel: {
			flex: 1,
			marginHorizontal: 24,
			marginVertical: 24,
			...textStyle.paragraph,
		},
		dateLabel: {
			marginLeft: 8,
			...textStyle.paragraph,
		},
		dateIcon: {
			width: 24,
			height: 24,
			tintColor: theme['text-hint-color'],
		},
		backIconContainer: {
			flex: 1,
		},
	}),
)
