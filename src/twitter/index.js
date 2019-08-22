import React from 'react'
import { View, Text } from 'native-base'
import AppLayout from '../frame/AppLayout'
import styled from 'styled-components'

class TwitterComponent extends React.PureComponent {
	render () {
		return (
			<AppLayout>
				<StyledView>
					<Text>Hello from twitter feed</Text>
				</StyledView>
			</AppLayout>
		)
	}
}
export default TwitterComponent

const StyledView = styled(View)`
	background: #eee;
`
