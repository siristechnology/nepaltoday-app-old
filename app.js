import { Provider } from 'react-redux'
import { StatusBar, Alert } from 'react-native'
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

import * as RNLocalize from 'react-native-localize'

/* diable-eslint-line */
import { mapping, light as lightTheme } from '@eva-design/eva'
import { storeFcmToken } from './src/mutations/store-fcm.mutation'
import { useModal } from './src/components/common/modal.component'
import { NotificationModal } from './src/layout/notification/notification-modal'

function App() {
	const [notification, setNotification] = useState(false)
	const [country] = useState(RNLocalize.getCountry())
	const [timeZone] = useState(RNLocalize.getTimeZone())

	const notificationModal = useModal()

	console.log('_______________timezone_______________', timeZone)

	console.log('_______________country_______________', country)

	const getToken = async () => {
		try {
			let fcmToken = await AsyncStorage.getItem('fcmToken')
			console.log('_______________fcm token _______________', fcmToken)

			if (!fcmToken) {
				fcmToken = await firebase.messaging().getToken()
				if (fcmToken) {
					await AsyncStorage.setItem('fcmToken', fcmToken)
					storeFcmToken({ fcmToken, countryCode: country, timeZone })
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
			console.log(
				'_______________error occured on request permission_______________',
				error,
			)
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

	const showAlert = () => {
		console.log('_______________title_______________', notification.title)
		console.log(
			'_______________message_______________',
			notification.message,
		)
		notificationModal.open()

		// return Alert.alert(
		// 	title,
		// 	message,
		// 	[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
		// 	{ cancelable: false },
		// )
	}

	/*
	 * Triggered when a particular notification has been received in foreground
	 * */
	const messageListner = async () => {
		this.foregroundNotificationListner = firebase
			.notifications()
			.onNotification(notification => {
				const { title, body } = notification
				setNotification({ title, message: body })

				console.log(
					'_______________app is in foreground_______________',
				)
				showAlert()
			})

		/*
		 * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
		 * */
		this.backgroundNotificationListener = firebase
			.notifications()
			.onNotificationOpened(notificationOpen => {
				const { title, body } = notificationOpen.notification
				console.log('_______________app in background_______________')
				setNotification({ title, message: body })

				showAlert(title, body)
			})

		/*
		 * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
		 * */
		await firebase.notifications().getInitialNotification()

		firebase.messaging().onMessage(message => {
			console.log(
				'_______________message_______________',
				JSON.stringify(message),
			)
		})
	}

	useEffect(() => {
		SplashScreen.hide()
		checkPushNotificationPermission()
		messageListner()
		return () => {
			this.foregroundNotificationListner()
			this.backgroundNotificationListener()
		}
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
							<NotificationModal
								notification={notification.message}
							/>
						</ErrorBoundary>
					</Root>
				</Provider>
			</ApplicationProvider>
		</StyleProvider>
	)
}

export default App
