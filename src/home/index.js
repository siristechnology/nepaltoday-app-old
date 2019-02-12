import React from "react";
import { View } from "react-native";
import { QueryRenderer, graphql } from 'react-relay';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Container, Content, Header, Left, Text } from 'native-base';
import ArticleCard from './components/article-card';
import environment from '../environment';
import actionCreators from './ducks/actions'

class Home extends React.Component {

	render () {
		return (
			<QueryRenderer
				environment={environment}
				query={graphql`
					query homeQuery{
							getArticles{
								_id
								title
								shortDescription
								content
								link
								imageLink
								source
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
	return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
