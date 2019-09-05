import React from 'react'
import { Container } from 'native-base'

import BottomNavigation from '../home/components/bottom-navigation'

class AppLayout extends React.PureComponent {
	render () {
		const { children } = this.props
		return (
			<Container>
				{children}
				<BottomNavigation />
			</Container>
		)
	}
}

export default AppLayout
