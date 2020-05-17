import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { ApplicationProvider } from 'react-native-ui-kitten'
import { mapping, light as lightTheme } from '@eva-design/eva'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import notificationHandler from './src/services/notification-handler'
import NavigationService from './src/services/navigationService'

const App = () => {
	useEffect(() => {
		SplashScreen.hide()

		notificationHandler.register()
	}, [])

	return (
		<ApplicationProvider mapping={mapping} theme={lightTheme}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<ErrorBoundary>
					<AppContainer
						ref={(navigatorRef) => {
							NavigationService.setTopLevelNavigator(navigatorRef)
						}}
					/>
				</ErrorBoundary>
			</Provider>
		</ApplicationProvider>
	)
}

export default App
