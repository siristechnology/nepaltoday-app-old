import React from 'react'
import {
	Body,
	Text,
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
				<CardItem cardBody>
					<Body>
						<Text style={styles.title}>{title}</Text>
						<View style={styles.timeWrapper}>
							<Icon
								type="AntDesign"
								name="clockcircleo"
								style={styles.icon}
							/>
							<MutedText>{relativTime}</MutedText>
						</View>
						<View style={styles.imgWithLogo}>
							<ImageContainer>
								<Image
									source={{ uri: imageLink || logoLink }}
									resizeMethod="scale"
									style={styles.image}
								/>
							</ImageContainer>
							<View style={styles.logoWrapper}>
								<Thumbnail
									source={{ uri: logoLink }}
									style={styles.thumbnail}
								/>
							</View>
						</View>
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
		borderColor: 'transparent',
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
		fontSize: 25,
		textAlign: 'center',
	},
	contentWrapper: {
		textAlign: 'justify',
		flex: 1,
	},

	content: {
		textAlign: 'justify',
		fontSize: 18,
		marginTop: 8,
		opacity: 0.7,
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
	imgWithLogo: {
		width: '100%',
		paddingBottom: 16,
		position: 'relative',
	},
	logoWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 8,
	},
	thumbnail: {
		width: 40,
		height: 40,
		borderColor: 'white',
		borderWidth: 2,
	},
	timeWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
})
