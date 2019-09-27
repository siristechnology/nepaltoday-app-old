import { Provider } from 'react-redux'
import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { StyleProvider, Root } from 'native-base'
import SplashScreen from 'react-native-splash-screen'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import getTheme from './src/native-base-theme/components'
import variables from './src/native-base-theme/variables/platform'

function App() {
	useEffect(() => {
		SplashScreen.hide()
	}, [])

	return (
		<StyleProvider style={getTheme(variables)}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<Root>
					<ErrorBoundary>
						<AppContainer />
					</ErrorBoundary>
				</Root>
			</Provider>
		</StyleProvider>
	)
}

export default App
