import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten'

import HomeScreen from '../home-screen/home.screen'
import TwitterScreen from '../twitter-screen/twitter.screen'
import HeadlineScreen from '../headline-screen/headline.screen'

export const ButtonNavigationComponent = props => {
	const onTabSelect = selectedIndex => {
		const { [selectedIndex]: selectedRoute } = props.navigation.state.routes
		props.navigation.navigate(selectedRoute.routeName)
	}

	const HomeIcon = <FontAwesome name="home" />

	return (
		<BottomNavigation
			selectedIndex={props.navigation.state.index}
			onSelect={onTabSelect}>
			<BottomNavigationTab title="Home" />
			<BottomNavigationTab title="Headline" />
			<BottomNavigationTab title="Twitter" />
		</BottomNavigation>
	)
}

export const BottomTabScreen = createBottomTabNavigator(
	{
		Home: HomeScreen,
		Headline: HeadlineScreen,
		Twitter: TwitterScreen,
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
					iconName = 'newspaper-o'
				} else if (routeName === 'Twitter') {
					iconName = 'twitter'
				}

				return (
					<FontAwesome name={iconName} size={25} color={tintColor} />
				)
			},
		}),
		tabBarOptions: {
			activeTintColor: '#ff0000',
			inactiveTintColor: 'gray',
			showLabel: false,
		},
	},
)
