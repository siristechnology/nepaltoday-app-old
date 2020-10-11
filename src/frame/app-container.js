import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { BottomTabScreen } from '../screens/navigation/bottom-navigation.screen'
import ArticleDetailScreen from '../layout/article/article-detail/article-detail.container'
import { ArticleWebviewComponent } from '../components'

const Stack = createStackNavigator()

const Container = ({ initialScreenName, initialParams }) => {
	const initialRoute = initialScreenName === 'ArticleDetail' ? 'ArticleDetail' : 'Tab'

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Tab" component={BottomTabScreen} initialParams={{ initialScreenName }} />
				<Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} initialParams={initialParams} />
				<Stack.Screen name="Article" component={ArticleWebviewComponent} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Container
