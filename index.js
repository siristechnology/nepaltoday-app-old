import React, { useState } from 'react'
import { AppRegistry, LogBox } from 'react-native'
import { 
	Provider as PaperProvider, 
	DefaultTheme as PaperDefaultTheme, 
	DarkTheme as PaperDarkTheme
} from 'react-native-paper'
import { AppearanceProvider } from 'react-native-appearance'
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native' 

import App from './app.js'
import { name as appName } from './app.json'
import { ApolloProvider } from '@apollo/react-hooks'
import GraphqlClient from './src/graphql/graphql-client'
import { SafeAreaProvider } from 'react-native-safe-area-context'

LogBox.ignoreLogs(['Warning: componentWillMount is deprecated', 'Warning: componentWillReceiveProps is deprecated', 'Module RCTImageLoader requires'])

const ApolloApp = () => {

	const [darkMode, setDarkMode] = useState(false)

	const onModeChange = (mode) => {
		setDarkMode(mode)
	}

	return (<SafeAreaProvider>
		<AppearanceProvider>
			<NavigationContainer theme={darkMode && NavigationDarkTheme || NavigationDefaultTheme}>
				<PaperProvider
					theme={darkMode && 
						{
							...PaperDarkTheme,
							dark: true,
							borderWidth: 0.2,
							colors: { ...PaperDarkTheme.colors, primary: '#212121', secondary: '#F5F5F5', header: '#424242' }
						} ||
						{
							...PaperDefaultTheme,
							borderWidth: 0.2,
							colors: { ...PaperDefaultTheme.colors, primary: '#1ba1f2', secondary: '#212121', header: '#EEEEEE' },
						}
					}
				>
					<ApolloProvider client={GraphqlClient}>
						<App 
							onModeChange={(mode)=>onModeChange(mode)}
							darkMode={darkMode}
						/>
					</ApolloProvider>
				</PaperProvider>
			</NavigationContainer>
		</AppearanceProvider>
	</SafeAreaProvider>)
}

AppRegistry.registerComponent(appName, () => ApolloApp)
