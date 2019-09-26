import { Provider } from 'react-redux'
import { StatusBar, Text } from 'react-native'
import { StyleProvider, Root } from 'native-base'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useNetInfo } from '@react-native-community/netinfo'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import { SplashScreenComponent } from './src/components'
import getTheme from './src/native-base-theme/components'
import variables from './src/native-base-theme/variables/platform'

function App() {
	const netInfo = useNetInfo()
	const [isConnected, setConnected] = useState(true)
	const [refreshCounter, setRefreshCounter] = useState(0)
	useEffect(() => {
		SplashScreen.hide()
	}, [])

	useEffect(() => {
		setConnected(netInfo.isConnected)
	}, [netInfo])

	const refreshApp = () => {
		setRefreshCounter(refreshCounter + 1)
	}

	const renderContent = () =>
		isConnected ? (
			<AppContainer />
		) : (
			<SplashScreenComponent onRefresh={refreshApp} />
		)
	return (
		<StyleProvider style={getTheme(variables)}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<Root>
					<ErrorBoundary>{renderContent()}</ErrorBoundary>
				</Root>
			</Provider>
		</StyleProvider>
	)
}

export default App
