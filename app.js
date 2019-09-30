import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { StyleProvider, Root } from 'native-base'
import SplashScreen from 'react-native-splash-screen'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import getTheme from './src/native-base-theme/components'
import variables from './src/native-base-theme/variables/platform'

import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider } from 'react-native-ui-kitten'

function App() {
	useEffect(() => {
		SplashScreen.hide()
	}, [])

	return (
		<StyleProvider style={getTheme(variables)}>
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
				<Provider store={store}>
					<StatusBar barStyle="light-content" />
					<Root>
						<ErrorBoundary>
							<AppContainer />
						</ErrorBoundary>
					</Root>
				</Provider>
			</ApplicationProvider>
		</StyleProvider>
	)
}

export default App
