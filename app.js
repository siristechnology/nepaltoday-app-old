import React, { Component } from 'react';
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import AppContainer from './src/frame/app-container';
import getTheme from "./src/native-base-theme/components";
import variables from "./src/native-base-theme/variables/platform";
import { store } from "./src/store";

type Props = {};
export default class App extends Component<Props> {
	constructor() {
		super();
		this.state = {
			isLoading: true
		};
	}

	render () {
		//TODO: Need a splash screen while app is loading
		return (
			<StyleProvider style={getTheme(variables)}>
				<Provider store={store}>
					<AppContainer />
				</Provider>
			</StyleProvider>
		);
	}
}
