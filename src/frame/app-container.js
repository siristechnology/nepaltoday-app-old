import { createStackNavigator, createAppContainer } from 'react-navigation'

import ArticleScreen from '../article/index.js'
import BottomTabs from '../home/components/bottom-navigation'
import ArticleDetailScreen from '../home/components/article-detail.screen.js'

const AppNavigator = createStackNavigator(
	{
		Tab: { screen: BottomTabs },
		Article: { screen: ArticleScreen },
		ArticleDetail: { screen: ArticleDetailScreen }
	},
	{
		headerMode: 'none',
		initialRouteName: 'Tab'
	}
)

export default createAppContainer(AppNavigator)
