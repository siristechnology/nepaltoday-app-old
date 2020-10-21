import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeScreen from '../home-screen/home.screen'
import TwitterScreen from '../twitter-screen/twitter.screen'
import HeadlineScreen from '../headline-screen/headline.screen'
import CoronaScreen from '../corona-screen/corona.screen'
import TrendingScreen from './../trending-screen/trending.screen'
import RadioScreen from './../radio-screen/radio.screen'

const Tab = createMaterialBottomTabNavigator()

export const BottomTabScreen = ({ route }) => {
	return (
		<Tab.Navigator initialRouteName={route.params.initialScreenName} shifting={false} labeled={false}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" size={25} color={color} /> }}
			/>
			<Tab.Screen
				name="Headline"
				component={HeadlineScreen}
				options={{ 
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="newspaper-variant-multiple-outline" size={25} color={color} />, 
					tabBarTestID: 'categoryScreen' 
				}}
			/>
			<Tab.Screen
				name="Corona"
				component={CoronaScreen}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="skull" size={25} color={color} />,
					tabBarTestID: 'coronaScreen',
				}}
			/>
			<Tab.Screen
				name="Trending"
				component={TrendingScreen}
				options={{ 
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="trending-up" size={25} color={color} />,
					tabBarTestID: 'trendingScreen' 
				}}
			/>
			<Tab.Screen
				name="Twitter"
				component={TwitterScreen}
				options={{ 
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="twitter" size={25} color={color} />, 
					tabBarTestID: 'twitterScreen'
				}}
			/>
			<Tab.Screen
				name="Radio"
				component={RadioScreen}
				options={{ 
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="radio" size={25} color={color} />, 
					tabBarTestID: 'radioScreen'
				}}
			/>
		</Tab.Navigator>
	)
}
