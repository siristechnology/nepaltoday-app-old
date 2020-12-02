import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Tab, Tabs } from 'native-base'
import TrendingPerson from './trending-persons/trending.screen'
import TrendingTweets from './trending-tweets/twitter.screen'
import { useTheme, Text } from 'react-native-paper'

const TrendingScreen = (props) => {

	const theme = useTheme()

    return (
		<Container style={{backgroundColor: theme.colors.lightBackground}}>
			<View style={[style.headerStyle,{backgroundColor: theme.colors.background}]}>
				<Text style={style.textStyle}>ट्रेण्डिङ</Text>
			</View>
			<Tabs tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}>
				<Tab
					style={{ flex: 1 }}
					heading="ट्रेण्डिङ ट्वीट्स"
					tabStyle={{ backgroundColor: theme.colors.lightBackground }}
					activeTabStyle={{ backgroundColor: theme.colors.lightBackground }}
					textStyle={{ color: theme.colors.text }}
					activeTextStyle={{ color: theme.colors.text }}
				>
					<TrendingTweets />
				</Tab>
				<Tab
					testID="trendingFigures"
					style={{ flex: 1 }}
					heading="ट्रेण्डिङ व्यक्तिहरु"
					tabStyle={{ backgroundColor: theme.colors.lightBackground }}
					activeTabStyle={{ backgroundColor: theme.colors.lightBackground }}
					textStyle={{ color: theme.colors.text }}
					activeTextStyle={{ color: theme.colors.text }}
				>
					<TrendingPerson 
						navigation={props.navigation}
					/>
				</Tab>
			</Tabs>
		</Container>
	)
}

const style = StyleSheet.create({
	headerStyle: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	textStyle: {
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
	},
})

export default TrendingScreen