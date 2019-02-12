import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import actionCreators from '../ducks/actions.js';

class ArticleCard extends Component {

	handleArticleCardPressed () {
		const { navigation } = this.props;
		navigation.navigate('Article');

		this.props.actions.startToOpenArticle();
	}

	render () {
		const { article } = this.props;

		return (
			<Card style={{ flex: 0 }}>
				<CardItem>
					<Left>
						<Thumbnail source={{ uri: article.topImageUrl }} />
						<Body>
							<Text>{article.title}</Text>
							<Text note>April 15, 2016</Text>
						</Body>
					</Left>
				</CardItem>
				<CardItem button onPress={this.handleArticleCardPressed.bind(this)} >
					<Body>
						<Image source={{ uri: article.topImageUrl }} style={{ height: 200, width: 200, flex: 1 }} />
						<Text>
							{article.shortDescription}
						</Text>
					</Body>
				</CardItem>
				<CardItem>
					<Left>
						<Button transparent textStyle={{ color: '#87838B' }}>
							<Icon name="logo-github" />
							<Text>2 hours ago</Text>
						</Button>
					</Left>
				</CardItem>
			</Card>
		);
	}
}

function mapStateToProps (state) {
	return {
	};
}

function mapDispatchToProps (dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard)
