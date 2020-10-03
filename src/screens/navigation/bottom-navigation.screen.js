import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../home-screen/home.screen'
import TwitterScreen from '../twitter-screen/twitter.screen'
import HeadlineScreen from '../headline-screen/headline.screen'
import CoronaScreen from '../corona-screen/corona.screen'
import TrendingScreen from './../trending-screen/trending.screen'
import RadioScreen from './../radio-screen/radio.screen'

const Tab = createBottomTabNavigator()

export const BottomTabScreen = ({ route }) => {
	return (
		<Tab.Navigator
			initialRouteName={route.params.initialScreenName}
			tabBarOptions={{
				activeTintColor: '#ff0000',
				inactiveTintColor: 'gray',
				showLabel: true,
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ tabBarIcon: ({ focused, horizontal, tintColor }) => <FontAwesome name={'home'} size={25} /> }}
			/>
			<Tab.Screen
				name="Headline"
				component={HeadlineScreen}
				options={{ tabBarIcon: ({ focused, horizontal, tintColor }) => <FontAwesome name={'newspaper'} size={25} color={tintColor} /> }}
			/>
			<Tab.Screen
				name="Corona"
				component={CoronaScreen}
				options={{ tabBarIcon: ({ focused, horizontal, tintColor }) => <FontAwesome name={'skull'} size={25} color={tintColor} /> }}
			/>
			<Tab.Screen
				name="Trending"
				component={TrendingScreen}
				options={{ tabBarIcon: ({ focused, horizontal, tintColor }) => <SimpleLine name={'fire'} size={25} color={tintColor} /> }}
			/>
			<Tab.Screen
				name="Twitter"
				component={TwitterScreen}
				options={{ tabBarIcon: ({ focused, horizontal, tintColor }) => <FontAwesome name={'twitter'} size={25} color={tintColor} /> }}
			/>
			<Tab.Screen
				name="Radio"
				component={RadioScreen}
				options={{ tabBarIcon: ({ focused, horizontal, tintColor }) => <FontAwesome name={'headphones'} size={25} color={tintColor} /> }}
			/>
		</Tab.Navigator>
	)
}
