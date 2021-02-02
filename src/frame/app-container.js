import React from 'react'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'

import { BottomTabScreen } from '../screens/navigation/bottom-navigation.screen'
import ArticleDetailScreen from '../layout/article/article-detail/article-detail.container'
import { ArticleWebviewComponent } from '../components'
import SettingsScreen from '../screens/settings-screen/settings.screen'
import TagArticleScreen from '../screens/tagArticle-screen/tagArticle.screen'

const Stack = createStackNavigator()

const Container = ({ initialParams, onModeChange, darkMode, clicked, coronaNotif, article }) => {
	const initialRoute = 'Tab'

	return (
		<Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="Tab"
				component={BottomTabScreen}
				initialParams={{ clicked, coronaNotif, article }}
			/>
			<Stack.Screen
				name="ArticleDetail"
				component={ArticleDetailScreen}
				initialParams={{...initialParams,initialRoute}}
			/>
			<Stack.Screen name="Article" component={ArticleWebviewComponent} />
			<Stack.Screen
				name="Settings"
				component={SettingsScreen}
				initialParams={{ onModeChange, darkMode }}
			/>
			<Stack.Screen
				name="TagArticle"
				component={TagArticleScreen}
				initialParams={initialParams}
			/>
		</Stack.Navigator>
	)
}

export default Container
