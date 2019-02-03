import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default class ArticleCard extends Component {

	handleArticleCardPressed () {
		alert('something pressed');
		const { navigation } = this.props;
		navigation.navigate('NewEvent');
	}

	render () {
		const { article } = this.props;

		return (
			<Card style={{ flex: 0 }}>
				<CardItem>
					<Left>
						<Thumbnail source={{ uri: article.topImageUrl }} />
						<Body>
							<Text>NativeBase</Text>
							<Text note>April 15, 2016</Text>
						</Body>
					</Left>
				</CardItem>
				<CardItem onPress={this.handleArticleCardPressed.bind(this)} >
					<Body>
						<Image source={{ uri: article.topImageUrl }} style={{ height: 200, width: 200, flex: 1 }} />
						<Text>
							विराटनगर — प्रदेश १ मा हिउँदे अधिवेशन आइतबार सुरु हुँदैछ । दिउँसो ३ वजे सुरु हुने अधिवेशन प्रदेश प्रमुखले पठाएको पत्र पढेर प्रारम्भ हुनेछ । पहिलो दिनको बैठकमा प्रदेश सभामा प्रतिनिधित्व गर्ने दलका नेताहरूले बोल्ने कार्यसूची तयार भएको छ ।
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