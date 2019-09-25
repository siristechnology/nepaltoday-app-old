import React from 'react'
import {
	Body,
	Text,
	Left,
	Icon,
	Card,
	View,
	Right,
	Button,
	Content,
	CardItem,
	Thumbnail,
} from 'native-base'
import { Image, StyleSheet } from 'react-native'
import { HeaderBackButton } from 'react-navigation'

import { np } from '../lang/np'
import { MutedText } from '../styled'
import { ImageContainer } from '../style'
import { getRelativeTime } from '../helper/time'

const ArticleDetail = ({ navigation }) => {
	const { READ_MORE, BACK } = np.public
	const {
		state: {
			params: {
				article: {
					title,
					content,
					link,
					imageLink,
					publishedDate,
					source: { name, logoLink },
				},
			},
		},
	} = navigation
	const relativTime = getRelativeTime(publishedDate)

	const handleLinkClick = () => {
		navigation.navigate('Article', { link })
	}

	const renderContent = () => {
		return (
			content &&
			content.split('\n').map((text, index) => (
				<Text style={styles.content} key={index}>
					{text}
				</Text>
			))
		)
	}
	const navigateBack = () => {
		navigation.goBack()
	}

	return (
		<Content>
			<View style={styles.iconWrapper}>
				<Icon
					onPress={navigateBack}
					type="AntDesign"
					name="back"
					style={styles.icon}
				/>
				<Text>{BACK}</Text>
			</View>
			<Card style={styles.root}>
				<CardItem>
					<Left>
						<Thumbnail source={{ uri: logoLink }} size={24} />
						<Body>
							<Text>{name}</Text>
						</Body>
					</Left>
				</CardItem>
				<CardItem cardBody>
					<Body>
						<Text style={styles.title}>{title}</Text>
						<MutedText>{relativTime}</MutedText>
						<ImageContainer>
							<Image
								source={{ uri: imageLink || logoLink }}
								resizeMethod="scale"
								style={styles.image}
							/>
						</ImageContainer>
						<View style={styles.contentWrapper}>
							{renderContent()}
						</View>
					</Body>
				</CardItem>
				<Right>
					<Button rounded primary iconRight onPress={handleLinkClick}>
						<Text>{READ_MORE}</Text>
						<Icon name="arrow-forward" />
					</Button>
				</Right>
			</Card>
		</Content>
	)
}

export { ArticleDetail }

const styles = StyleSheet.create({
	root: {
		padding: 8,
	},
	imageContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		backgroundColor: 'rgba(27,31,35,.05)',
		elevation: 1,
		margin: 2,
		borderRadius: 8,
	},
	image: {
		flex: 1,
		height: 200,
		top: 0,
		borderRadius: 8,
		borderWidth: 0.5,
	},
	title: {
		fontWeight: '900',
		fontSize: 20,
	},
	contentWrapper: {
		textAlign: 'justify',
	},

	content: {
		fontWeight: '400',
		textAlign: 'justify',
		fontSize: 18,
		marginTop: 8,
	},
	icon: {
		padding: 8,
		fontSize: 16,
	},
	iconWrapper: {
		backgroundColor: '#eee',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
})
