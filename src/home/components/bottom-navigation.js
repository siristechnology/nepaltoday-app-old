import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { Footer, FooterTab, Button, Icon, Text as NBText } from 'native-base'

import HomeScreen from '../index'
import TwitterScreen from '../../twitter'
import HeadlineScreen from '../../screens/headline.screen'

const BottomTabs = createBottomTabNavigator(
	{
		Home: { screen: HomeScreen },
		Headline: { screen: HeadlineScreen },
		Twitter: { screen: TwitterScreen }
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
							onPress={() => props.navigation.navigate('Home')}
						>
							<Icon ios="ios-menu" name="home" />
							<NBText>Home</NBText>
						</Button>
						<Button
							vertical
							active={props.navigation.state.index === 1}
							onPress={() => props.navigation.navigate('Headline')}
						>
							<Icon name="newspaper" type="FontAwesome5" />
							<NBText>Headlines</NBText>
						</Button>
						<Button
							vertical
							active={props.navigation.state.index === 2}
							onPress={() => props.navigation.navigate('Twitter')}
						>
							<Icon active ios="twitter" android="twitter" type="FontAwesome" />
							<Text>Twitter</Text>
						</Button>
					</FooterTab>
				</Footer>
			)
		}
	}
)

export default BottomTabs
