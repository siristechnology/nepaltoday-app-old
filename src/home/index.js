import React from "react";
import { View } from "react-native";
import { Container, Content, Header, Left, Text } from 'native-base';
import ArticleCard from './components/article-card';

class HomeScreen extends React.Component {

	render () {
		const article1 = {
			_id: '1',
			title: 'Hot New News',
			shortDescription: 'article short description',
			url: 'https://www.kantipurdaily.com/',
			topImageUrl: 'https://assets-cdn.kantipurdaily.com/uploads/source/news/kantipur/2018/miscellaneous/university-03122018022011-240x158.jpg'
		};

		return (
			<Container>
				<Content>
					<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
						<ArticleCard article={article1} key={article1._id} />
						<ArticleCard article={article1} key={article1._id} onPress={this.handleArticleCardPressed.bind(this)} />
						<ArticleCard article={article1} key={article1._id} onPress={this.handleArticleCardPressed.bind(this)} />
						<ArticleCard article={article1} key={article1._id} onPress={this.handleArticleCardPressed.bind(this)} />
						<ArticleCard article={article1} key={article1._id} onPress={this.handleArticleCardPressed.bind(this)} />
						<ArticleCard article={article1} key={article1._id} onPress={this.handleArticleCardPressed.bind(this)} />
					</View>
				</Content>
			</Container>
		);
	}
}

export default HomeScreen;