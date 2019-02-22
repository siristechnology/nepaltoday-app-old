import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image, Dimensions, StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body } from 'native-base';
import actionCreators from '../ducks/actions.js';

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

		return (
			<Card transparent style={{ flex: 0 }}>
				<CardItem button onPress={this.handleArticleCardPressed.bind(this)}
					style={{ paddingTop: 20, paddingBottom: 4 }}>
					<Body>
						<Image source={{ uri: article.imageLink }} resizeMode="cover"
							style={{ flex: 0, height: 200, width: imageWidth, alignSelf: 'center' }} />
						<Text style={{ fontSize: 22 }}>{article.title}</Text>
						<Text>{article.shortDescription}</Text>
					</Body>
				</CardItem>
				<CardItem style={{ paddingTop: 0, paddingBottom: 0, marginBottom: 0 }}>
					<Left >
						<Button transparent textStyle={{ color: '#87838B' }}>
							<Thumbnail source={{ uri: article.imageLink }} style={{ width: 20, height: 20, borderRadius: 20 / 2 }} />
							<Text note>2 hours ago</Text>
						</Button>
					</Left>
				</CardItem>
			</Card>
		);
	}
}

function mapStateToProps () {
	return {
	};
}

function mapDispatchToProps (dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard)
