import { createStackNavigator, createAppContainer } from 'react-navigation'

import { ArticleWebviewComponent, SplashScreenComponent } from '../components'
import { BottomTabScreen } from '../screens/navigation/bottom-navigation.screen'
import ArticleDetailScreen from '../layout/article/article-detail/article-detail.container'

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
		ArticleDetail: { screen: ArticleDetailScreen },
	},
	{
		headerMode: 'none',
		initialRouteName: 'Tab',
	},
)

export default createAppContainer(AppNavigator)
