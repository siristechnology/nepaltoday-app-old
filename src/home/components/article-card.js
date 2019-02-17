import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Image, Dimensions } from "react-native";
import { Card, CardItem, Thumbnail, Text, Button, Left, Body } from 'native-base';
import actionCreators from '../ducks/actions.js';

class ArticleCard extends Component {

	handleArticleCardPressed () {
		this.props.actions.startToOpenArticle(this.props.article);

		const { navigation } = this.props;
		navigation.navigate('Article', { article: this.props.article });
	}

	render () {
		const { article } = this.props;
		let dimensions = Dimensions.get("window");
		let imageHeight = Math.round((dimensions.width * 9) / 16);
		let imageWidth = dimensions.width;

		return (
			<Card transparent style={{ flex: 0 }}>
				<CardItem button onPress={this.handleArticleCardPressed.bind(this)} >
					<Body>
						<Image source={{ uri: article.imageLink }} style={{ flex: 0, height: imageHeight, width: imageWidth }} resizeMode="contain" />
						<Text>{article.title}</Text>
						<Text>{article.shortDescription}</Text>
					</Body>
				</CardItem>
				<CardItem>
					<Left>
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
