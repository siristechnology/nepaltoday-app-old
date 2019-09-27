import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Analytics from 'appcenter-analytics'
import { QueryRenderer, graphql } from 'react-relay'
import { FlatList, RefreshControl, AppState } from 'react-native'

import { Spinner } from 'native-base'
import environment from '../../environment'
import AppLayout from '../../frame/app-layout'
import { ArticleCard } from '../../components'
import actionCreators from '../../ducks/actions'

class Home extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			isUpdated: false,
			appState: AppState.currentState,
		}
	}

	componentDidMount() {
		Analytics.trackEvent('Home page load')
		AppState.addEventListener(
			'change',
			this._handleAppStateChange.bind(this),
		)
	}

	componentDidUpdate() {
		Analytics.trackEvent('Home page refresh')
	}

	componentWillUnmount() {
		AppState.removeEventListener(
			'change',
			this._handleAppStateChange.bind(this),
		)
	}

	_handleAppStateChange(nextAppState) {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			console.log('App has come to the foreground!')
			this.handleRefresh()
		}
		this.setState({ appState: nextAppState })
	}

	handleRefresh() {
		Analytics.trackEvent('Pull down refresh')
		this.setState({ isUpdated: !this.state.isUpdated })
	}

	render() {
		return (
			<QueryRenderer
				environment={environment}
				variables={{ isUpdated: this.state.isUpdated }}
				query={graphql`
					query homeScreenQuery {
						getArticles {
							_id
							title
							shortDescription
							content
							link
							imageLink
							publishedDate
							modifiedDate
							category
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
						return (
							<AppLayout>
								<Spinner />
							</AppLayout>
						)
					} else if (error) {
						console.log('error:' + JSON.stringify(error))
					}

					return (
						<AppLayout>
							<FlatList
								data={props.getArticles}
								keyExtractor={item => item._id}
								extraData={this.state}
								renderItem={({ item }) => {
									return (
										<ArticleCard
											article={item}
											key={item._id}
											actions={this.props.actions}
											navigation={this.props.navigation}
										/>
									)
								}}
								refreshControl={
									<RefreshControl
										colors={['#9Bd35A', '#689F38']}
										onRefresh={this.handleRefresh.bind(
											this,
										)}
									/>
								}
							/>
						</AppLayout>
					)
				}}
			/>
		)
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Home)
