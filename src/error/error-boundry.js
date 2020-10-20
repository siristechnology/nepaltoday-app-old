import React from 'react'
import { Alert, DevSettings } from 'react-native'
import crashlytics from '@react-native-firebase/crashlytics'
import { removeAsync } from '../helper/cacheStorage'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		removeAsync()
		if (this.state.hasError) {
			error.message += `.  Caused by ${errorInfo.componentStack}`
			crashlytics().recordError(error)

			Alert.alert('Error!!', 'Something went wrong. Please close & reopen your app !!', [{ text: 'OK', onPress: () => DevSettings.reload() }], {
				cancelable: true,
			})
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
