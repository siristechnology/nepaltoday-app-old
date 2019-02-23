import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, Dimensions, StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body, View } from 'native-base';
import actionCreators from '../ducks/actions.js';
import moment from 'moment'

class ArticleCard extends React.Component {
	handleArticleCardPressed () {
		this.props.actions.startToOpenArticle(this.props.article);

		const { navigation } = this.props;
		navigation.navigate('Article', { article: this.props.article });
	}

	render () {
		const { article } = this.props;
		let dimensions = Dimensions.get('window');
		let imageWidth = dimensions.width * 0.94;

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
		});
		const relativeTime = moment(Number(article.publishedDate || article.modifiedDate)).startOf('hour').fromNow()

		return (
			<Card transparent style={{ flex: 0 }}>
				<CardItem button onPress={this.handleArticleCardPressed.bind(this)}
					style={{ paddingTop: 20, paddingBottom: 4 }}>
					<Body>
						<Image source={{ uri: article.imageLink }} resizeMode="cover"
							style={[styles.image, { width: imageWidth }]} />
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', marginTop: 6, marginBottom: 12 }}>
							<Thumbnail source={{ uri: article.source.logoLink }} style={{ width: 20, height: 20, borderRadius: 20 / 2, marginRight: 4 }} />
							<Text style={{ paddingRight: 10 }}>{article.source.name}</Text>
						</View>
						<Text style={{ fontSize: 22 }}>{article.title}</Text>
						<Text>{article.shortDescription}</Text>
					</Body>
				</CardItem>
				<CardItem style={{ paddingTop: 0, paddingBottom: 4, marginBottom: 0 }}>
					<Left >
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
							<Text note >{relativeTime}</Text>
						</View>
					</Left>
				</CardItem>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		flex: 0,
		height: 200,
		alignSelf: 'center',
		borderRadius: 6,
		borderWidth: 0.5
	}
});

function mapStateToProps () {
	return {
	};
}

function mapDispatchToProps (dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard)
