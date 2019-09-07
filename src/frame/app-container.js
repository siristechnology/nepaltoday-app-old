import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from '../home/index.js'
import TwitterScreen from '../twitter/index'
import ArticleScreen from '../article/index.js'
import ArticleDetailScreen from '../home/components/article-detail.screen.js'
import HeadlineScreen from '../screens/HeadlineScreen'

const AppNavigator = createStackNavigator(
	{
		Home: { screen: Home },
		Twitter: { screen: TwitterScreen },
		Article: { screen: ArticleScreen },
		Headline: { screen: HeadlineScreen },
		ArticleDetail: { screen: ArticleDetailScreen }
	},
	{
		headerMode: 'none',
		initialRouteName: 'Home'
	}
)

export default createAppContainer(AppNavigator)
