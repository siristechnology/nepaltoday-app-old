import React from 'react'
import { Text, Spinner, Container } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'
import { TabView, SceneMap } from 'react-native-tab-view'
import { en } from '../../lang/en'
import environment from '../../environment'
import AppLayout from '../../frame/app-layout'

const FirstRoute = () => <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />

const SecondRoute = () => <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />

class HeadlineScreen extends React.PureComponent {
	state = {
		index: 0,
		routes: [{ key: 'first', title: 'First' }, { key: 'second', title: 'Second' }]
	}
	renderQuery = ({ error, props }) => {
		if (!props) {
			return <Spinner />
		} else if (error) {
			console.log('error:' + JSON.stringify(error))
			throw new Error(`Error occured here ${JSON.stringify(error)}`)
		}
		if (error) {
			return <Text>{error.message}</Text>
		} else if (props) {
			return (
				<AppLayout>
					{props && props.getArticles.length > 0 ? (
						<Container>
							<TabView
								navigationState={this.state}
								renderScene={SceneMap({
									first: FirstRoute,
									second: SecondRoute
								})}
								onIndexChange={index => this.setState({ index })}
								initialLayout={{
									width: Dimensions.get('window').width
								}}
							/>
						</Container>
					) : null}
				</AppLayout>
			)
		}
		return <Spinner color='blue' />
	}
	render() {
		return (
			<QueryRenderer
				environment={environment}
				query={graphql`
					query headlineTabQuery {
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
				render={this.renderQuery}
			/>
		)
	}
}

export default HeadlineScreen

const styles = StyleSheet.create({
	header: {
		height: 10
	},
	scene: {
		flex: 1
	}
})
