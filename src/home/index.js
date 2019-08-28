import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Analytics from 'appcenter-analytics'
import { QueryRenderer, graphql } from 'react-relay'
import { FlatList, RefreshControl, AppState } from 'react-native'

import environment from '../environment'
import AppLayout from '../frame/AppLayout'
import actionCreators from './ducks/actions'
import ArticleCard from './components/article-card'
import SplashScreen from './components/splash-screen'
import OfflineNotice from './components/offline-notification'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

class Home extends React.PureComponent {
	constructor (props) {
		super(props)
		this.state = {
			isUpdated: false,
			appState: AppState.currentState
		}
	}

	componentDidMount () {
		Analytics.trackEvent('Home page load')
		AppState.addEventListener('change', this._handleAppStateChange.bind(this))
	}

	componentDidUpdate () {
		Analytics.trackEvent('Home page refresh')
	}

	componentWillUnmount () {
		AppState.removeEventListener(
			'change',
			this._handleAppStateChange.bind(this)
		)
	}

	_handleAppStateChange (nextAppState) {
		if (
			this.state.appState.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			console.log('App has come to the foreground!')
			this.handleRefresh()
		}
		this.setState({ appState: nextAppState })
	}

	handleRefresh () {
		Analytics.trackEvent('Pull down refresh')
		this.setState({ isUpdated: !this.state.isUpdated })
	}

	onSwipeUp (gestureState) {
		console.log('=====================up=============')
	}

	onSwipeDown (gestureState) {
		console.log('=====================down=============')
	}

	onSwipeLeft (gestureState) {
		console.log('=====================left=============')
	}

	onSwipeRight (gestureState) {
		console.log('=====================right============')
	}

	onSwipe (gestureName, gestureState) {
		const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections
		switch (gestureName) {
			case SWIPE_UP:
				console.log('=====================--up============')
				break
			case SWIPE_DOWN:
				console.log('=====================--down============')
				break
			case SWIPE_LEFT:
				console.log('====================--left=============')
				break
			case SWIPE_RIGHT:
				console.log('=====================--right============')
				break
		}
	}

	render () {
		const config = {
			velocityThreshold: 0.3,
			directionalOffsetThreshold: 80
		}
		return (
			<QueryRenderer
				environment={environment}
				variables={{ isUpdated: this.state.isUpdated }}
				query={graphql`
					query homeQuery {
						getArticles {
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
					console.log('props here',props);
					if (!props) {
						return <SplashScreen />
					} else if (error) {
						alert('error:' + JSON.stringify(error))
					}

					return (
						<AppLayout>
							<OfflineNotice />
							<GestureRecognizer
								onSwipe={(direction, state) => this.onSwipe(direction, state)}
								onSwipeUp={state => this.onSwipeUp(state)}
								onSwipeDown={state => this.onSwipeDown(state)}
								onSwipeLeft={state => this.onSwipeLeft(state)}
								onSwipeRight={state => this.onSwipeRight(state)}
								config={config}
								style={{
									flex: 1,
									backgroundColor: '#EEE'
								}}
							>
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
											onRefresh={this.handleRefresh.bind(this)}
										/>
									}
								/>
							</GestureRecognizer>
						</AppLayout>
					)
				}}
			/>
		)
	}
}

function mapStateToProps (state) {
	return {}
}

function mapDispatchToProps (dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
