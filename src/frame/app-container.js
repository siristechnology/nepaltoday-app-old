import { createStackNavigator, createAppContainer } from 'react-navigation'

import {
	ArticleDetail,
	ArticleWebviewComponent,
	SplashScreen,
} from '../components'
import { BottomTabScreen } from '../screens/navigation/bottom-navigation.screen'

const AppNavigator = createStackNavigator(
	{
		Splash: {
			screen: SplashScreen,
			navigationOptions: {
				header: {
					visible: false,
				},
			},
		},
		Tab: { screen: BottomTabScreen },
		Article: { screen: ArticleWebviewComponent },
		ArticleDetail: { screen: ArticleDetail },
	},
	{
		headerMode: 'none',
		initialRouteName: 'Tab',
	},
)

export default createAppContainer(AppNavigator)
