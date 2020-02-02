import React from 'react'
import { View, ScrollView } from 'react-native'
import { OfflineNotice } from '../components'

class AppLayout extends React.PureComponent {
	render() {
		const { children } = this.props
		return (
			<ScrollView>
				<OfflineNotice />
				{children}
			</ScrollView>
		)
	}
}

export default AppLayout
