import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { OfflineNotice } from '../components'

// class AppLayout extends React.PureComponent {
// 	render() {
// 		const { children } = this.props
// 		return (
// 			<View>
// 				<OfflineNotice />
// 				{children}
// 			</View>
// 		)
// 	}
// }

const AppLayout = (props) => {
	const { children } = props

	const theme = useTheme()

	return(
		<View style={{backgroundColor: theme.colors.background}}>
			<OfflineNotice />
			{children}
		</View>
	)
} 

export default AppLayout
