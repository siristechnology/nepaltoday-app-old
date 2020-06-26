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

const App = () => {

	const [clicked, setClicked] = useState(false)
	const [loading, setLoading] = useState(false)
	const [article, setArticle] = useState({})
	useEffect(() => {
		SplashScreen.hide()
		setLoading(true)
		signInAnonymously().then(() => notificationHandler.register(auth().currentUser))
		notificationHandler.checkForNotification().then(res=>{
			setClicked(true)
			setLoading(false)
			setArticle(res.data.getArticle)

		}).catch(err=>{
			setLoading(false)
		})

	}, [clicked])

	return (
		<ApplicationProvider mapping={mapping} theme={lightTheme}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<ErrorBoundary>
					{loading && <AppLayout>
						<CircularSpinner/>	
					</AppLayout> ||
					<AppContainer
						ref={(navigatorRef) => {
							if(!clicked){
								NavigationService.setTopLevelNavigator(navigatorRef)
							}else{
								NavigationService.setTopLevelNavigator(navigatorRef,'ArticleDetail', { article: article })
							}
						}}
					/>}
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
