import React from 'react'
import { Toast } from 'native-base'
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
			Toast.show({
				text: 'Something went wrong please refresh your app !!',
				type: 'warning',
				position: 'top'
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
