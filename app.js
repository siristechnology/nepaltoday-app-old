import React, { useEffect, useState } from 'react'
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
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import AppLayout from './src/frame/app-layout'
import { CircularSpinner } from './src/components/common'
import Realm from 'realm';

const App = () => {
	const [clicked, setClicked] = useState(false)
	const [loading, setLoading] = useState(false)
	const [article, setArticle] = useState({})

	const loadAppContainer = (article, clicked) => {
		if (clicked && article._id) {
			return (
				<AppContainer ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef, 'ArticleDetail', { article: article })} />
			)
		} else {
			return <AppContainer ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)} />
		}
	}

	const setMongoRealm=()=>{
		new Realm({
			path: 'ArticleDatabase.realm',
			schema: [
				{
					name: 'articles',
					properties: {
						'_id': 'string',
						'title': 'string',
						'shortDescription': 'string',
						'imageLink': 'string',
						'content': 'string',
						'link': 'string',
						'publishedDate': 'string',
						'category': 'string',
						'source': {
							"type": "source"
						},
						'modifiedDate': 'string',
					}
				},{
					name :'source',
					properties: {
						"_id":"string",
						"name":"string",
						"logoLink":"string"
					}
				}
			]
		})
	}

	useEffect(() => {
		setLoading(true)
		setMongoRealm()
		notificationHandler.checkForNotification().then(res=>{
			SplashScreen.hide()
			setClicked(true)
			setLoading(false)
			setArticle(res.data.getArticle)
		}).catch(err=>{
			SplashScreen.hide()
			setLoading(false)
		})
	}, [])

	return (
		<ApplicationProvider mapping={mapping} theme={lightTheme}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<ErrorBoundary>
					{(loading && (
						<AppLayout>
							<CircularSpinner />
						</AppLayout>
					)) ||
						loadAppContainer(article, clicked)}
				</ErrorBoundary>
			</Provider>
		</ApplicationProvider>
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
