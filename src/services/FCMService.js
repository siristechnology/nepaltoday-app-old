import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'

class FCMService {
	register = (onRegister, onNotification, onOpenNotification) => {
		this.checkPermission(onRegister)
		this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
	}

	checkPermission = (onRegister) => {
		firebase
			.messaging()
			.hasPermission()
			.then((enabled) => {
				if (enabled) {
					this.getToken(onRegister)
				} else {
					this.requestPermission(onRegister)
				}
			})
			.catch((error) => console.log('Permission rejected', error))
	}

	getToken = (onRegister) => {
		AsyncStorage.getItem('fcmToken').then((token) => {
			if (token) {
				onRegister(token)
			} else {
				firebase
					.messaging()
					.getToken()
					.then((fcmToken) => {
						if (fcmToken) {
							AsyncStorage.setItem('fcmToken', fcmToken)
							onRegister(fcmToken)
						} else {
							console.log('User does not have a device token')
						}
					})
					.catch((error) => console.log('getToken rejected', error))
			}
		})
	}

	requestPermission = (onRegister) => {
		firebase
			.messaging()
			.requestPermission()
			.then(() => {
				this.getToken(onRegister)
			})
			.catch((error) => {
				console.log('Request Permission rejected', error)
			})
	}

	deleteToken = () => {
		firebase
			.messaging()
			.deleteToken()
			.catch((error) => {
				console.log('Delete token error', error)
			})
	}

	createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
		//Triggered when a particular notification has been received in foreground
		this.notificationListener = firebase.notifications().onNotification((notification) => {
			onNotification(notification)
		})

		//If your app is in background
		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpened) => {
			onOpenNotification(notificationOpened)
		})

		//If your app is closed, you can check if it was opened by a notification
		//being clicked / tapped / opened
		firebase
			.notifications()
			.getInitialNotification()
			.then((notificationOpen) => {
				if (notificationOpen) {
					onOpenNotification(notificationOpen)
				}
			})

		//Triggered for data only payload in foreground
		this.messageListener = firebase.messaging().onMessage((message) => {
			onNotification(message)
		})

		// Triggered when have new token
		this.onTokenRefreshListener = firebase.messaging().onTokenRefresh((fcmToken) => {
			console.log('New Token Refresh: ', fcmToken)
			onRegister(fcmToken)
		})
	}

	unRegister = () => {
		this.notificationListener()
		this.notificationOpenedListener()
		this.messageListener()
		this.onTokenRefreshListener()
	}

	buildChannel = (obj) => {
		return new firebase.notifications.Android.Channel(
			obj.channelId,
			obj.channelName,
			firebase.notifications.Android.Importance.Default,
		).setDescription(obj.channelDes)
	}

	buildNotification = (obj) => {
		//For Android
		firebase.notifications().android.createChannel(obj.channel)

		return (
			new firebase.notifications.Notification()
				.setSound(obj.sound)
				.setNotificationId(obj.dataId)
				.setTitle(obj.title)
				.setBody(obj.content)
				.setData(obj.data)

				//For Android
				.android.setChannelId(obj.channel.channelId)
				.android.setLargeIcon('ic_launcher_notification_large')
				.android.setSmallIcon('ic_launcher_foreground')
				.android.setColor('#a60509')
				.android.setVibrate(obj.vibrate)
				.android.setAutoCancel(true)
		)
	}

	scheduleNotification = (notification, days, minutes) => {
		const date = new Date()
		if (days) {
			date.setDate(date.getDate() + days)
		}

		if (minutes) {
			date.setMinutes(date.getMinutes() + minutes)
		}

		firebase.notifications().scheduleNotification(notification, {
			fireDate: date.getTime,
		})
	}

	displayNotification = (notification) => {
		firebase
			.notifications()
			.displayNotification(notification)
			.catch((error) => console.log('Display Notification error: ', error))
	}

	removeDeliveredNotification = (notification) => {
		firebase.notifications().removeDeliveredNotification(notification.notificationId)
	}
}

export const fcmService = new FCMService()
