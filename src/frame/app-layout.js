import React from 'react'
import { View } from 'react-native'
import { OfflineNotice } from '../components'

class AppLayout extends React.PureComponent {
	render() {
		const { children } = this.props
		return (
			<View>
				<OfflineNotice />
				{children}
			</View>
		)
	}
}

export default AppLayout
