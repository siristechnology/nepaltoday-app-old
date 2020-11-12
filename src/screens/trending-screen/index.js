import React from 'react'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'

import TrendingTabs from './trending-tabs'
import TrendingDetail from './trending-detail'

const Stack = createStackNavigator()

const TrendingScreen = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="TrendingTabs" component={TrendingTabs} />
			<Stack.Screen name="TrendingDetail" component={TrendingDetail} />
		</Stack.Navigator>
	)
}

export default TrendingScreen