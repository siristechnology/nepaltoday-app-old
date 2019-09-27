import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import { StyleProvider, Root } from 'native-base'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useNetInfo } from '@react-native-community/netinfo'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import getTheme from './src/native-base-theme/components'
import variables from './src/native-base-theme/variables/platform'

function App() {
	const netInfo = useNetInfo()
	useEffect(() => {
		SplashScreen.hide()
	}, [])
	const [isConnected, setConnected] = useState(true)
	useEffect(() => {
		setConnected(netInfo.isConnected)
	}, [netInfo])

	return (
		<StyleProvider style={getTheme(variables)}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<Root>
					<ErrorBoundary>
						<AppContainer isConnected={isConnected} />
					</ErrorBoundary>
				</Root>
			</Provider>
		</StyleProvider>
	)
}

export default App
