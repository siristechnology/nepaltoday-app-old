import React from 'react'
import {
	Body,
	Card,
	Text,
	Left,
	Content,
	CardItem,
	Thumbnail,
	View
} from 'native-base'
import { MutedText } from '../../styled'
import { ImageContainer } from '../../style'
import { Image, StyleSheet } from 'react-native'
import { getRelativeTime } from '../../helper/time'

const ArticleDetailScreen = props => {
	console.log('props here', props)
	const {
		navigation: {
			state: {
				params: {
					article: {
						title,
						content,
						// link,
						imageLink,
						publishedDate,
						source: { name, logoLink }
					}
				}
			}
		}
	} = props
	const relativTime = getRelativeTime(publishedDate)

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
						<View style={styles.contentWrapper}>{renderContent()}</View>
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
	contentWrapper: {
		textAlign: 'justify'
	},

	content: {
		fontWeight: '400',
		fontSize: 12,
		marginTop: 8
	}
})

export default ArticleDetailScreen
