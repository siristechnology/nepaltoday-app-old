import React, { Component } from 'react';
import AppContainer from './src/frame/app-container';

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
			<AppContainer />
		);
	}
}
