import React from 'react'
import {
	Content,
	Card,
	CardItem,
	Thumbnail,
	Text,
	Button,
	Icon,
	Left,
	Body,
	Right,
	View
} from 'native-base'
import { Image, StyleSheet } from 'react-native'
import { getRelativeTime } from '../../helper/time'
import { MutedText } from '../../styled'
import { ImageContainer } from '../../style'

const ArticleDetailScreen = props => {
	console.log('props here', props)
	const {
		navigation: {
			state: {
				params: {
					article: {
						title,
						content,
						link,
						imageLink,
						publishedDate,
						source: { name, logoLink }
					}
				}
			}
		}
	} = props
	const relativTime = getRelativeTime(publishedDate)
	console.log('image link', imageLink)
	return (
		<Content>
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
						<Text style={styles.content}>{content}</Text>
					</Body>
				</CardItem>
			</Card>
		</Content>
	)
}

const styles = StyleSheet.create({
	root: {
		padding: 8
	},
	imageContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		backgroundColor: 'rgba(27,31,35,.05)',
		elevation: 1,
		margin: 2,
		borderRadius: 8
	},
	image: {
		flex: 1,
		height: 200,
		top: 0,
		borderRadius: 8,
		borderWidth: 0.5
	},
	title: {
		fontWeight: '900'
	},

	content: {
		fontWeight: '400',
		fontSize: 12,
		textAlign: 'justify'
	}
})

export default ArticleDetailScreen
