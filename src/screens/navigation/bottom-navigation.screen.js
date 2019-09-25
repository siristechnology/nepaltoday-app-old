import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Footer, FooterTab, Button, Icon } from 'native-base'

import HomeScreen from '../home-screen/home.screen'
import TwitterScreen from '../twitter-screen/twitter.screen'
import HeadlineScreen from '../headline-screen/headline.screen'
import { SplashScreen } from '../../components'

export const BottomTabScreen = createBottomTabNavigator(
	{
		Home: { screen: HomeScreen },
		Headline: { screen: HeadlineScreen },
		Twitter: { screen: TwitterScreen },
	},
	{
		tabBarPosition: 'bottom',
		swipeEnabled: false,
		tabBarComponent: props => {
			return (
				<Footer>
					<FooterTab>
						<Button
							vertical
							active={props.navigation.state.index === 0}
							onPress={() => props.navigation.navigate('Home')}>
							<Icon ios="ios-menu" name="home" />
						</Button>
						<Button
							vertical
							active={props.navigation.state.index === 1}
							onPress={() =>
								props.navigation.navigate('Headline')
							}>
							<Icon name="newspaper" type="FontAwesome5" />
						</Button>
						<Button
							vertical
							active={props.navigation.state.index === 2}
							onPress={() =>
								props.navigation.navigate('Twitter')
							}>
							<Icon
								ios="twitter"
								android="twitter"
								type="FontAwesome"
							/>
						</Button>
					</FooterTab>
				</Footer>
			)
		},
	},
)
