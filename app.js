import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { ApplicationProvider } from 'react-native-ui-kitten'
import { mapping, light as lightTheme } from '@eva-design/eva'
import * as RNLocalize from 'react-native-localize'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import { fcmService } from './src/services/FCMService'
import NavigationService from './src/services/navigationService'

const App = () => {
	const [storeFcmToken, { error }] = useMutation(STORE_FCM_MUTATION)
	const client = useApolloClient()

	onRegister = (token) => {
		storeFcmToken({
			variables: {
				input: {
					fcmToken: token,
					countryCode: RNLocalize.getCountry(),
					timeZone: RNLocalize.getTimeZone(),
				},
			},
		}).catch((reason) => console.log(reason))
	}

	useEffect(() => {
		SplashScreen.hide()
		fcmService.register(onRegister, onNotification, onOpenNotification)
	}, [])

	onNotification = (notify) => {
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

	onOpenNotification = async (notify) => {
		const { data, errors } = await client
			.query({
				query: GET_ARTICLE_QUERY,
				variables: { _id: notify.notification.data._id },
			})
			.catch((reason) => console.log('printing reason', reason))

		if (errors) console.log('printing errors', errors)
		NavigationService.navigate('ArticleDetail', { article: data.getArticle })
	}

	if (error) {
		console.log('error:' + JSON.stringify(error))
	}

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

const STORE_FCM_MUTATION = gql`
	mutation storeFcmMutation($input: StoreFcmInput!) {
		storeFcmToken(input: $input) {
			fcmToken
			countryCode
			timeZone
		}
	}
`

const GET_ARTICLE_QUERY = gql`
	query articleQuery($_id: String!) {
		getArticle(_id: $_id) {
			_id
			title
			shortDescription
			content
			link
			imageLink
			publishedDate
			modifiedDate
			category
			source {
				_id
				name
				logoLink
			}
		}
	}
`

export default App
