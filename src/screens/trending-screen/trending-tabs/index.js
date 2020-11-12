import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Container, Tab, Tabs } from 'native-base'
import TrendingPerson from './trending-persons/trending.screen'
import TrendingTweets from './trending-tweets/twitter.screen'

const TrendingScreen = (props) => {
    return (
		<Container>
			<View style={style.headerStyle}>
				<Text style={style.textStyle}>ट्रेण्डिङ</Text>
			</View>
			<Tabs tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}>
				<Tab
					style={{ flex: 1 }}
					heading="ट्रेण्डिङ ट्वीट्स"
					tabStyle={{ backgroundColor: '#fff' }}
					activeTabStyle={{ backgroundColor: '#fff' }}
					textStyle={{ color: '#000' }}
					activeTextStyle={{ color: '#000' }}
				>
					<TrendingTweets />
				</Tab>
				<Tab
					style={{ flex: 1 }}
					heading="ट्रेण्डिङ व्यक्तिहरु"
					tabStyle={{ backgroundColor: '#fff' }}
					activeTabStyle={{ backgroundColor: '#fff' }}
					textStyle={{ color: '#000' }}
					activeTextStyle={{ color: '#000' }}
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