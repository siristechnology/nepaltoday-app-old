import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { StyleProvider } from 'native-base'
import AppContainer from './src/frame/app-container'
import getTheme from './src/native-base-theme/components'
import variables from './src/native-base-theme/variables/platform'
import { store } from './src/store'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			isLoading: true
		}
	}

	render() {
		return (
			<StyleProvider style={getTheme(variables)}>
				<Provider store={store}>
					<StatusBar barStyle="light-content" />
					<AppContainer />
				</Provider>
			</StyleProvider>
		)
	}
}
