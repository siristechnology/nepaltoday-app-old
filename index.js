import React from 'react'
import { AppRegistry, LogBox } from 'react-native'
import App from './app.js'
import { name as appName } from './app.json'
import { ApolloProvider } from '@apollo/react-hooks'
import GraphqlClient from './src/graphql/graphql-client'

LogBox.ignoreLogs(['Warning: componentWillMount is deprecated', 'Warning: componentWillReceiveProps is deprecated', 'Module RCTImageLoader requires'])

const ApolloApp = () => (
	<ApolloProvider client={GraphqlClient}>
		<App />
	</ApolloProvider>
)

AppRegistry.registerComponent(appName, () => ApolloApp)
