import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleProvider, Root } from 'native-base'
import SplashScreen from 'react-native-splash-screen'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import getTheme from './src/native-base-theme/components'
import { ApplicationProvider } from 'react-native-ui-kitten'
import variables from './src/native-base-theme/variables/platform'

/* diable-eslint-line */
import { mapping, light as lightTheme } from '@eva-design/eva'

function App() {
	useEffect(() => {
		SplashScreen.hide()
	}, [])

	/* diable-eslint-line */
	const [theme, setTheme] = useState(lightTheme)

	return (
		<StyleProvider style={getTheme(variables)}>
			<ApplicationProvider mapping={mapping} theme={theme}>
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
