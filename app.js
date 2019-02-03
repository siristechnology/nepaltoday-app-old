import React, { Component } from 'react';
import { StyleProvider } from "native-base";
import AppContainer from './src/frame/app-container';
import getTheme from "./src/native-base-theme/components";
import variables from "./src/native-base-theme/variables/platform";

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
				<AppContainer />
			</StyleProvider>
		);
	}
}
