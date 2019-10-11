import React from 'react'
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
		tabBarComponent: ButtonNavigationComponent,
	},
)
