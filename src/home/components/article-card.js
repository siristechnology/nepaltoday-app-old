import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Analytics from 'appcenter-analytics'
import { Image, StyleSheet } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Left, Body, View } from 'native-base'

import actionCreators from '../ducks/actions.js'

class ArticleCard extends React.PureComponent {
	handleArticleCardPressed () {
		this.props.actions.startToOpenArticle(this.props.article)

		Analytics.trackEvent('Article link click')
		const { navigation } = this.props
		// navigation.navigate('Article', { article: this.props.article })
		navigation.navigate('ArticleDetail', { article: this.props.article })
	}

	render () {
		const { article } = this.props

		moment.updateLocale('en', {
			relativeTime: {
				past: '%s अघि',
				m: '1 मिनेट',
				mm: '%d मिनेट',
				h: '1 घण्टा',
				hh: '%d घण्टा',
				d: '1 दिन',
				dd: '%d दिन'
			}
		})
		const relativeTime = moment(
			Number(article.publishedDate || article.modifiedDate)
		)
			.startOf('hour')
			.fromNow()

		return (
			<Card transparent style={{ flex: 1, borderBottomWidth: 0.4 }}>
				<CardItem
					button
					onPress={this.handleArticleCardPressed.bind(this)}
					style={{
						paddingTop: 12,
						paddingLeft: 10,
						paddingRight: 10,
						paddingBottom: 4
					}}
					activeOpacity={1}
				>
					<Body>
						<View style={styles.imageContainer}>
							<Image
								source={{ uri: article.imageLink }}
								resizeMethod="scale"
								style={styles.image}
							/>
						</View>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'baseline',
								marginTop: 6,
								marginBottom: 12
							}}
						>
							<Thumbnail
								source={{ uri: article.source.logoLink }}
								style={{
									width: 20,
									height: 20,
									borderRadius: 20 / 2,
									marginRight: 4
								}}
							/>
							<Text style={styles.newsSource}>{article.source.name}</Text>
						</View>
						<View style={{ flex: 1, justifyContent: 'flex-start' }}>
							<Text style={{ fontSize: 19, includeFontPadding: true }}>
								{article.title}
							</Text>
							<Text>{article.shortDescription}</Text>
						</View>
					</Body>
				</CardItem>
				<CardItem style={{ paddingTop: 0, paddingBottom: 4, marginBottom: 0 }}>
					<Left>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'baseline'
							}}
						>
							<Text note>{relativeTime}</Text>
						</View>
					</Left>
				</CardItem>
			</Card>
		)
	}
}

const styles = StyleSheet.create({
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
	newsSource: {
		color: '#737373',
		fontSize: 16,
		paddingRight: 10
	}
})

function mapStateToProps () {
	return {}
}

function mapDispatchToProps (dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleCard)
