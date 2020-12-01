import React, { useEffect, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { StatusBar } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import notificationHandler from './src/services/notification-handler'
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import AppLayout from './src/frame/app-layout'
import { CircularSpinner } from './src/components/common'
import PushNotification from 'react-native-push-notification'
import { getReadArticles, clearOldArticles } from './src/services/asyncStorageService'
import readArticlesService from './src/services/readArticles.service'

const App = (props) => {
	const [clicked, setClicked] = useState(false)
	const [loading, setLoading] = useState(false)
	const [article, setArticle] = useState({})
	const [coronaNotif, setCoronaNotif] = useState(false)

	const onRegister = (token) => {
		signInAnonymously().then(() => notificationHandler.register(auth().currentUser, token.token))
	}

	const onNotif = (notif) => {
		if (notif.data && notif.data._id && notif.foreground === false) {
			setLoading(true)
			notificationHandler
				.handleNotificationClick(notif.data._id)
				.then((res) => {
					setArticle(res.data.getArticle)
					setClicked(true)
					setLoading(false)
				})
				.catch((err) => {
					crashlytics().recordError(err)
					setLoading(false)
				})
		} else if (notif.data && notif.data.notifType === 'corona' && notif.foreground === false) {
			setLoading(true)
			setClicked(true)
			setCoronaNotif(true)
			setLoading(false)
		}
	}

	const loadAppContainer = (article, clicked, coronaNotif) => {
		if (clicked && article._id) {
			return <AppContainer initialScreenName="ArticleDetail" initialParams={{ article }} />
		} else if (clicked && coronaNotif) {
			return <AppContainer initialScreenName="Corona" />
		} else {
			return <AppContainer 
				onModeChange={props.onModeChange}
				darkMode={props.darkMode}
			/>
		}
	}

	useEffect(() => {
		const configureNotification = async () => {
			PushNotification.configure({
				onRegister: onRegister,
				onNotification: onNotif,
			})
		}

		const addReadArticles = async () => {
			const readArticles = await getReadArticles()
			auth().currentUser && readArticlesService.saveReadArticle(auth().currentUser.uid, readArticles)
			clearOldArticles()
		}

		configureNotification().then(() => {
			addReadArticles()
		})
	}, [])

	return (
		// <ApplicationProvider {...eva} theme={eva.light}>
			<ReduxProvider store={store}>
				<StatusBar barStyle="light-content" />
				<ErrorBoundary>
					{(loading && (
						<AppLayout>
							<CircularSpinner />
						</AppLayout>
					)) ||
						loadAppContainer(article, clicked, coronaNotif)}
				</ErrorBoundary>
			</ReduxProvider>
		// </ApplicationProvider>
	)
}

const signInAnonymously = () => {
	return auth()
		.signInAnonymously()
		.catch((error) => {
			crashlytics().recordError(error)
		})
}

export default App
