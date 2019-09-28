import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Analytics from 'appcenter-analytics'
import { StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Body, View } from 'native-base'

import { ImageContainer } from '../style'
import actionCreators from '../ducks/actions.js'
import { Time } from './time.component'

class CardComponent extends React.PureComponent {
	handleArticleCardPressed() {
		// this.props.actions.startToOpenArticle(this.props.article)

		Analytics.trackEvent('Article link click')
		const { navigation } = this.props
		navigation.navigate('ArticleDetail', { article: this.props.article })
	}

	render() {
		const { article } = this.props

		return (
			<Card transparent style={{ flex: 1, borderBottomWidth: 0.4 }}>
				<CardItem
					button
					onPress={this.handleArticleCardPressed.bind(this)}
					style={{
						paddingTop: 12,
						paddingLeft: 10,
						paddingRight: 10,
						paddingBottom: 4,
					}}
					activeOpacity={1}>
					<Body>
						<ImageContainer>
							<Image
								source={{ uri: article.imageLink }}
								resizeMode="cover"
								resizeMethod="scale"
								style={styles.image}
								PlaceholderContent={<ActivityIndicator />}
							/>
						</ImageContainer>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 6,
								marginBottom: 12,
							}}>
							<Thumbnail
								source={{ uri: article.source.logoLink }}
								style={{
									width: 20,
									height: 20,
									borderRadius: 20 / 2,
									marginRight: 4,
								}}
							/>

							<Text style={styles.newsSource}>
								{article.source.name}
							</Text>
							<Time
								value={
									article.publishedDate ||
									article.modifiedDate
								}
							/>
						</View>
						<View style={{ flex: 1, justifyContent: 'flex-start' }}>
							<Text style={styles.title}>{article.title}</Text>
							<Text style={styles.content}>
								{article.shortDescription}
							</Text>
						</View>
					</Body>
				</CardItem>
				<CardItem
					style={{
						paddingTop: 0,
						paddingBottom: 4,
						marginBottom: 0,
					}}></CardItem>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		width: Dimensions.get('window').width * 0.9,
		height: 200,
		top: 0,
		borderRadius: 8,
	},
	title: {
		fontWeight: '900',
		fontSize: 20,
	},
	content: {
		fontWeight: '400',
		textAlign: 'justify',
		fontSize: 16,
		marginTop: 8,
		opacity: 0.6,
	},
	newsSource: {
		color: '#737373',
		fontSize: 16,
		paddingRight: 10,
	},
})

function mapStateToProps() {
	return {}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export const ArticleCard = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CardComponent)
