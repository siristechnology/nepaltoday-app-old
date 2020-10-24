import React from 'react'
import { AppRegistry, LogBox } from 'react-native'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { AppearanceProvider } from 'react-native-appearance'

import App from './app.js'
import { name as appName } from './app.json'
import { ApolloProvider } from '@apollo/react-hooks'
import GraphqlClient from './src/graphql/graphql-client'
import { SafeAreaProvider } from 'react-native-safe-area-context'

LogBox.ignoreLogs(['Warning: componentWillMount is deprecated', 'Warning: componentWillReceiveProps is deprecated', 'Module RCTImageLoader requires'])

const ApolloApp = () => (
	<SafeAreaProvider>
		<AppearanceProvider>
			<PaperProvider
				theme={{
					...DefaultTheme,
					borderWidth: 0.2,
					colors: { ...DefaultTheme.colors, primary: '#1ba1f2' },
				}}
			>
				<ApolloProvider client={GraphqlClient}>
					<App />
				</ApolloProvider>
			</PaperProvider>
		</AppearanceProvider>
	</SafeAreaProvider>
)

AppRegistry.registerComponent(appName, () => ApolloApp)
