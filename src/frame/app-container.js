import React from 'react'
import { View } from 'react-native'
import BottomNavigation from '../home/components/bottom-navigation'

import {
	createAppContainer,
	createNavigator,
	SceneView,
	TabRouter
} from 'react-navigation'

import Home from '../home/index.js'
// import TwitterScreen from '../twitter/index'
// import ArticleScreen from '../article/index.js'
// import ArticleDetailScreen from '../home/components/article-detail.screen.js'
import HeadlineScreen from '../screens/HeadlineScreen'

const CustomTabView = ({ descriptors, navigation, screenProps }) => {
	// const { routes, index } = navigation.state
	let { state } = navigation
	let activeKey = state.routes[state.index].key
	let descriptor = descriptors[activeKey]
	let ScreenComponent = descriptor.getComponent()
	console.log('Printing ScreenComponent', ScreenComponent)
	console.log('Printing screenProps', screenProps)

	return (
		<View>
			<SceneView
				component={ScreenComponent}
				navigation={descriptor.navigation}
				screenProps={screenProps}
			/>
			<BottomNavigation navigation={navigation} />
		</View>
	)
}

const CustomTabRouter = TabRouter(
	{
		Home: {
			screen: Home
		},
		Headline: {
			screen: HeadlineScreen
		}
	},
	{
		initialRouteName: 'Home'
	}
)

export default createAppContainer(
	createNavigator(CustomTabView, CustomTabRouter, {})
)
