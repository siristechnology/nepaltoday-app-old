import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
// import { PreferencesContext } from './src/context/preferencesContext'
// import { ApplicationProvider } from 'react-native-ui-kitten'
// import { mapping, light as lightTheme } from '@eva-design/eva'
// import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
// import { useColorScheme } from 'react-native-appearance'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import notificationHandler from './src/services/notification-handler'
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import AppLayout from './src/frame/app-layout'
import { CircularSpinner } from './src/components/common'
import RNBootSplash from 'react-native-bootsplash'
import PushNotification from 'react-native-push-notification'
import { getReadArticles, clearOldArticles } from './src/services/asyncStorageService'
import readArticlesService from './src/services/readArticles.service'

const App = () => {
	const [clicked, setClicked] = useState(false)
	const [loading, setLoading] = useState(false)
	const [article, setArticle] = useState({})
	const [coronaNotif, setCoronaNotif] = useState(false)
	// const colorScheme = useColorScheme()
	// const [theme, setTheme] = (React.useState < 'light') | ('dark' > (colorScheme === 'dark' ? 'dark' : 'light'))

	const onRegister = (token) => {
		signInAnonymously().then(() => notificationHandler.register(auth().currentUser, token.token))
	}

	const onNotif = (notif) => {
		if (notif._id && notif.foreground === false) {
			setLoading(true)
			notificationHandler
				.handleNotificationClick(notif._id)
				.then((res) => {
					setArticle(res.data.getArticle)
					setClicked(true)
					setLoading(false)
				})
				.catch((err) => {
					crashlytics().recordError(err)
					setLoading(false)
				})
		} else if (notif.notifType === 'corona' && notif.foreground === false) {
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
			return <AppContainer />
		}
	}

	useEffect(() => {
		RNBootSplash.hide()

		const configureNotification = async () => {
			PushNotification.configure({
				onRegister: onRegister,
				onNotification: onNotif,
			})
		}
		configureNotification()

		const addReadArticles = async () => {
			const readArticles = await getReadArticles()
			readArticlesService.saveReadArticle(auth().currentUser.uid, readArticles)
			clearOldArticles()
		}

		addReadArticles()
	}, [])

	return (
		<Provider store={store}>
			<StatusBar barStyle="light-content" />
			<ErrorBoundary>
				{(loading && (
					<AppLayout>
						<CircularSpinner />
					</AppLayout>
				)) ||
					loadAppContainer(article, clicked, coronaNotif)}
			</ErrorBoundary>
		</Provider>
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
