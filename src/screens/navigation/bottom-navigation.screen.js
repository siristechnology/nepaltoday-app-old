import React from 'react'
import color from 'color'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'

import HomeScreen from '../home-screen/home.screen'
import HeadlineScreen from '../headline-screen/headline.screen'
import CoronaScreen from '../corona-screen/corona.screen'
import TrendingScreen from './../trending-screen'
import RadioScreen from './../radio-screen/radio.screen'

const Tab = createMaterialBottomTabNavigator()

export const BottomTabScreen = ({ route }) => {
	const theme = useTheme()

	return (
		<Tab.Navigator
			initialRouteName={route.params.initialScreenName}
			backBehavior="initialRoute"
			shifting={false}
			labeled={false}
			activeColor={theme.colors.primary}
			inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
			sceneAnimationEnabled={false}
			barStyle={{ backgroundColor: theme.colors.surface, borderTopWidth: theme.borderWidth, borderTopColor: theme.colors.disabled }}
		>
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
					tabBarTestID: 'categoryScreen',
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
					tabBarTestID: 'trendingScreen',
				}}
			/>
			<Tab.Screen
				name="Radio"
				component={RadioScreen}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="radio" size={25} color={color} />,
					tabBarTestID: 'radioScreen',
				}}
			/>
		</Tab.Navigator>
	)
}
