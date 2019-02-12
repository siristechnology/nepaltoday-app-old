import React from "react";
import { View } from "react-native";
import { QueryRenderer, graphql} from 'react-relay';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Container, Content, Header, Left, Text } from 'native-base';
import ArticleCard from './components/article-card';
import environment from '../environment';
import actionCreators from './ducks/actions'

class Home extends React.Component {

	render () {
		const article1 = {
			_id: '1',
			title: 'Hot New News',
			shortDescription: 'article short description',
			url: 'https://www.kantipurdaily.com/',
			topImageUrl: 'https://assets-cdn.kantipurdaily.com/uploads/source/news/kantipur/2018/miscellaneous/university-03122018022011-240x158.jpg'
		};

		return (
			<QueryRenderer
				environment={environment}
				query={graphql`
					query homeQuery{
							getArticles{
								title
								shortDescription
								content
							}
						}
					`}

				render={({ error, props }) => {
					if (!props) {
						return <Text>Loading...</Text>;
					}
					else if (!!error) {
						alert('error:' + JSON.stringify(error));
					}
					return (
						<Container>
							<Content>
								<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
									{
										props.getArticles.map((article, index) => (
											<ArticleCard article={article} key={article._id} actions={this.props.actions} navigation={this.props.navigation} />
										))
									}
								</View>
							</Content>
						</Container>
					);
				}}
			/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
