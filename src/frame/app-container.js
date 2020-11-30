import React from 'react'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'

import { BottomTabScreen } from '../screens/navigation/bottom-navigation.screen'
import ArticleDetailScreen from '../layout/article/article-detail/article-detail.container'
import { ArticleWebviewComponent } from '../components'
import SettingsScreen from '../screens/settings-screen/settings.screen'

const Stack = createStackNavigator()

const Container = ({ initialScreenName, initialParams, onModeChange, darkMode }) => {
	const initialRoute = initialScreenName === 'ArticleDetail' ? 'ArticleDetail' : 'Tab'

	return (
			<Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Tab" component={BottomTabScreen} initialParams={{ initialScreenName }} />
				<Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} initialParams={initialParams} />
				<Stack.Screen name="Article" component={ArticleWebviewComponent} />
				<Stack.Screen name="Settings" component={SettingsScreen} initialParams={{onModeChange, darkMode}} />
			</Stack.Navigator>
	)
}

export default Container
