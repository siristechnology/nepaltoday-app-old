import React from 'react'
import { Container } from 'native-base'
import { OfflineNotice } from '../components'

class AppLayout extends React.PureComponent {
	render() {
		const { children } = this.props
		return (
			<Container>
				<OfflineNotice />
				{children}
			</Container>
		)
	}
}

export default AppLayout
