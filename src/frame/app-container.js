import { createStackNavigator, createAppContainer } from 'react-navigation'

import {
	ArticleDetail,
	ArticleWebviewComponent,
	SplashScreenComponent,
} from '../components'
import { BottomTabScreen } from '../screens/navigation/bottom-navigation.screen'

const AppNavigator = createStackNavigator(
	{
		Splash: {
			screen: SplashScreenComponent,
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
