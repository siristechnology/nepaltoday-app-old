import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { QueryRenderer, graphql } from 'react-relay';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import Analytics from 'appcenter-analytics'
import ArticleCard from './components/article-card';
import SplashScreen from './components/splash-screen';
import OfflineNotice from './components/offline-notification';
import environment from '../environment';
import actionCreators from './ducks/actions'

class Home extends React.PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			refreshing: false
		};
	}

	componentDidMount () {
		Analytics.trackEvent('Home page load');
	}

	componentDidUpdate () {
		Analytics.trackEvent('Home page refresh');
	}

	handleRefresh () {
		this.setState({ refreshing: true });
		setTimeout(() => {
			this.setState({ refreshing: false });
		}, 500);
	}

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
								publishedDate
								modifiedDate
								source {
									_id
									name
									logoLink
								}
							}
						}
					`}

				render={({ error, props }) => {
					if (!props) {
						return <SplashScreen />
					} else if (error) {
						alert('error:' + JSON.stringify(error));
					}

					return (
						<Container>
							<OfflineNotice />
							<FlatList data={props.getArticles}
								keyExtractor={item => item._id}
								renderItem={({ item }) => {
									return <ArticleCard article={item}
										key={item._id}
										actions={this.props.actions}
										navigation={this.props.navigation} />
								}}
								refreshControl={
									<RefreshControl
										colors={['#9Bd35A', '#689F38']}
										refreshing={this.state.refreshing}
										onRefresh={this.handleRefresh.bind(this)}
									/>
								}
							/>
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
