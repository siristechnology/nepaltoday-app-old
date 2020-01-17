import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import firebase from 'react-native-firebase'
import React, { useEffect, useState } from 'react'
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage from '@react-native-community/async-storage'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import { ApplicationProvider } from 'react-native-ui-kitten'

import * as RNLocalize from 'react-native-localize'

/* diable-eslint-line */
import { mapping, light as lightTheme } from '@eva-design/eva'
import { storeFcmToken } from './src/mutations/store-fcm.mutation'
import { NotificationModal } from './src/layout/notification/notification-modal'

const App = () => {
	const [notification, setNotification] = useState(false)
	const [country] = useState(RNLocalize.getCountry())
	const [timeZone] = useState(RNLocalize.getTimeZone())

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

	/*
	 * Triggered when a particular notification has been received in foreground
	 * */
	const messageListner = async () => {
		this.foregroundNotificationListner = firebase
			.notifications()
			.onNotification(notification => {
				notification.android.setChannelId('insider').setSound('default')
				firebase.notifications().displayNotification(notification)
				const { title, body } = notification
				setNotification({ title, message: body })
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

		const channel = new firebase.notifications.Android.Channel(
			'insider',
			'Test Channel',
			firebase.notifications.Android.Importance.Max,
		).setDescription('My test app channel')
		firebase.notifications().android.createChannel(channel)
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
		<ApplicationProvider mapping={mapping} theme={theme}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<ErrorBoundary>
					<AppContainer />
					<NotificationModal notification={notification.message} />
				</ErrorBoundary>
			</Provider>
		</ApplicationProvider>
	)
}

export default App
