import React from 'react'

import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import HomeScreen from '../home-screen/home.screen'
import TwitterScreen from '../twitter-screen/twitter.screen'
import HeadlineScreen from '../headline-screen/headline.screen'
import CoronaScreen from '../corona-screen/corona.screen'
import TrendingScreen from './../trending-screen/trending.screen'
import RadioScreen from './../radio-screen/radio.screen'

const Tab = createMaterialBottomTabNavigator()

export const BottomTabScreen = ({ route }) => {
	return (
		<Tab.Navigator
			initialRouteName={route.params.initialScreenName}
			tabBarOptions={{
				activeTintColor: '#1da1f2',
				inactiveTintColor: 'gray',
				showLabel: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name={'home'} size={25} color={color} /> }}
			/>
			<Tab.Screen
				name="Headline"
				component={HeadlineScreen}
				options={{ tabBarIcon: ({ color }) => <FontAwesome name={'newspaper'} size={25} color={color} /> }}
			/>
			<Tab.Screen
				name="Corona"
				component={CoronaScreen}
				options={{ tabBarIcon: ({ color }) => <FontAwesome name={'skull'} size={25} color={color} />, tabBarTestID: 'coronaScreen' }}
			/>
			<Tab.Screen
				name="Trending"
				component={TrendingScreen}
				options={{ tabBarIcon: ({ color }) => <SimpleLine name={'fire'} size={25} color={color} /> }}
			/>
			<Tab.Screen
				name="Twitter"
				component={TwitterScreen}
				options={{ tabBarIcon: ({ color }) => <FontAwesome name={'twitter'} size={25} color={color} /> }}
			/>
			<Tab.Screen
				name="Radio"
				component={RadioScreen}
				options={{ tabBarIcon: ({ color }) => <FontAwesome name={'headphones'} size={25} color={color} /> }}
			/>
		</Tab.Navigator>
	)
}
