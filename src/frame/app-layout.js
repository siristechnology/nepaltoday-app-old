import React from 'react'
import { Layout } from 'react-native-ui-kitten'
import { OfflineNotice } from '../components'

class AppLayout extends React.PureComponent {
	render() {
		const { children } = this.props
		return (
			<Layout>
				<OfflineNotice />
				{children}
			</Layout>
		)
	}
}

export default AppLayout
