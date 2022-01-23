import React, { useEffect, useState } from 'react'
import { AppRegistry, LogBox } from 'react-native'
import {
	Provider as PaperProvider,
	DefaultTheme as PaperDefaultTheme,
	DarkTheme as PaperDarkTheme,
} from 'react-native-paper'
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'

import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'

import App from './app.js'
import { name as appName } from './app.json'
import { ApolloProvider } from '@apollo/react-hooks'
import GraphqlClient from './src/graphql/graphql-client'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { getMode, setMode } from './src/services/asyncStorageService.js'

LogBox.ignoreLogs([
	'Warning: componentWillMount is deprecated',
	'Warning: componentWillReceiveProps is deprecated',
	'Module RCTImageLoader requires',
])

export const ApolloApp = () => {
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		getMode().then((mode) => {
			setDarkMode(mode)
		})
	}, [])

	const onModeChange = (mode) => {
		setDarkMode(mode)
		setMode(mode)
	}

	return (
		<SafeAreaProvider>
			<ApplicationProvider
				{...eva}
				theme={(darkMode && { ...eva.dark, 'background-basic-color-1': '#121212' }) || eva.light}
			>
				<NavigationContainer theme={(darkMode && NavigationDarkTheme) || NavigationDefaultTheme}>
					<PaperProvider
						theme={
							(darkMode && {
								...PaperDarkTheme,
								dark: true,
								borderWidth: 0.2,
								colors: {
									...PaperDarkTheme.colors,
									primary: '#121212',
									secondary: '#F5F5F5',
									header: '#424242',
									divider: '#616161',
									lightBackground: '#212121',
								},
							}) || {
								...PaperDefaultTheme,
								borderWidth: 0.2,
								colors: {
									...PaperDefaultTheme.colors,
									primary: '#fcfcfc',
									secondary: '#212121',
									header: '#EEEEEE',
									divider: '#EEEEEE',
									lightBackground: '#F5F5F5',
								},
							}
						}
					>
						<ApolloProvider client={GraphqlClient}>
							<App onModeChange={(mode) => onModeChange(mode)} darkMode={darkMode} />
						</ApolloProvider>
					</PaperProvider>
				</NavigationContainer>
			</ApplicationProvider>
		</SafeAreaProvider>
	)
}

AppRegistry.registerComponent(appName, () => ApolloApp)
