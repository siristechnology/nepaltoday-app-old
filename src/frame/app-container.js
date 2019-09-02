import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from '../home/index.js'
import TwitterScreen from '../twitter/index'
import ArticleScreen from '../article/index.js'

const AppNavigator = createStackNavigator(
	{
		Home: { screen: Home },
		Article: { screen: ArticleScreen },
		Twitter: { screen: TwitterScreen }
	},
	{
		headerMode: 'none',
		initialRouteName: 'Home'
	}
)

export default createAppContainer(AppNavigator)
