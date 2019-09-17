import React from 'react'
import { Container } from 'native-base'

class AppLayout extends React.PureComponent {
	render() {
		const { children } = this.props
		return <Container>{children}</Container>
	}
}

export default AppLayout
