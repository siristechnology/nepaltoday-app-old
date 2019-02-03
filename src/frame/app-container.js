import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from '../home/index.js';
import ArticleScreen from '../article/index.js';

const AppNavigator = createStackNavigator({
	Home: { screen: HomeScreen },
	Article: { screen: ArticleScreen}
}, {
	initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);