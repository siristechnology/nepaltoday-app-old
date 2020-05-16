import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from '../home-screen/home.screen'
// import TwitterScreen from '../twitter-screen/twitter.screen'
import HeadlineScreen from '../headline-screen/headline.screen'

export const BottomTabScreen = createBottomTabNavigator(
	{
		Home: HomeScreen,
		Headline: HeadlineScreen,
		// Twitter: TwitterScreen,
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state
				let iconName
				if (routeName === 'Home') {
					iconName = 'home'
				} else if (routeName === 'Headline') {
					iconName = 'newspaper'
				} else if (routeName === 'Twitter') {
					iconName = 'twitter'
				}

				return <FontAwesome name={iconName} size={25} color={tintColor} />
			},
		}),
		tabBarOptions: {
			activeTintColor: '#ff0000',
			inactiveTintColor: 'gray',
			showLabel: false,
		},
	},
)
