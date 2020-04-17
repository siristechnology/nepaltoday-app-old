import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import { ApplicationProvider } from 'react-native-ui-kitten'

import * as RNLocalize from 'react-native-localize'

/* diable-eslint-line */
import { mapping, light as lightTheme } from '@eva-design/eva'
import { storeFcmToken } from './src/mutations/store-fcm.mutation'

import { fcmService } from './src/services/FCMService'
import NavigationService from './src/services/navigationService'

import { NEPALTODAY_SERVER } from 'react-native-dotenv'

class App extends Component {
	componentDidMount() {
		SplashScreen.hide()

		fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)
	}

	onRegister(token) {
		storeFcmToken({
			fcmToken: token,
			countryCode: RNLocalize.getCountry(),
			timeZone: RNLocalize.getTimeZone(),
		})
	}

	onNotification(notify) {
		//For Android
		const channelObj = {
			channelId: 'SampleChannelId',
			channelName: 'SampleChannelName',
			channelDes: 'SampleChannelDes',
		}
		const channel = fcmService.buildChannel(channelObj)
		const buildNotify = {
			dataId: notify._notificationId,
			title: notify._title,
			content: notify._body,
			sound: 'default',
			channel: channel,
			data: notify._data,
			vibrate: true,
		}
		const notification = fcmService.buildNotification(buildNotify)
		fcmService.displayNotification(notification)
	}

	onOpenNotification(notify) {
		fetch(NEPALTODAY_SERVER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `{
                  getArticle(_id: "${notify.notification.data._id}") {
                    title,
                    content,
                    imageLink,
                    shortDescription,
                    publishedDate,
                    link,
                    source {
                    logoLink,
                    name
                     }
                  }
				}
                `,
			}),
		})
			.then((res) => res.json())
			.then((articleJson) => {
				let article = articleJson.data.getArticle
				NavigationService.navigate('ArticleDetail', { article })
			})
	}
	render() {
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
}

export default App
