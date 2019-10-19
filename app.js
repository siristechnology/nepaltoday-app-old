import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import firebase from 'react-native-firebase'
import { StyleProvider, Root } from 'native-base'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import getTheme from './src/native-base-theme/components'
import { ApplicationProvider } from 'react-native-ui-kitten'
import variables from './src/native-base-theme/variables/platform'

/* diable-eslint-line */
import { mapping, light as lightTheme } from '@eva-design/eva'

function App() {
	const getToken = async () => {
		try {
			let fcmToken = await AsyncStorage.getItem('fcmToken')
			console.log('_______________fcm token _______________', fcmToken)

			if (!fcmToken) {
				fcmToken = await firebase.messaging().getToken()
				if (fcmToken) {
					await AsyncStorage.setItem('fcmToken', fcmToken)
				}
			}
		} catch (error) {
			console.log(
				'_________________error on get token__________________',
				error,
			)
		}
	}

	const requestPermission = async () => {
		try {
			await firebase.messaging().requestPermission()
			getToken()
		} catch (error) {
			console.log('----------------permission rejected')
		}
	}

	const checkPushNotificationPermission = async () => {
		try {
			const enabled = await firebase.messaging().hasPermission()
			console.log('_______________enabled_______________', enabled)
			if (enabled) {
				getToken()
			} else {
				requestPermission()
			}
		} catch (error) {
			console.log(
				'_______________error on push notification permission_______________',
				error,
			)
		}
	}
	useEffect(() => {
		SplashScreen.hide()
		checkPushNotificationPermission()
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
