import React from 'react'
import { Alert } from 'react-native'
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}
	componentDidCatch() {
		if (this.state.hasError) {
			Alert.alert(
				'Error!!',
				'Something went wrong please refresh your app !!',
				[],
				{ cancelable: true },
			)
		}
	}

	render() {
		if (this.state.hasError) {
			return <></>
		}

		return this.props.children
	}
}

export default ErrorBoundary
