import React, { PureComponent } from 'react'
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

function MiniOfflineSign() {
	return (
		<View style={styles.offlineContainer}>
			<Text style={styles.offlineText}>कृपया इन्टरनेट जाँच गर्नुहोस्</Text>
		</View>
	)
}

class OfflineNotice extends PureComponent {
	state = {
		isConnected: true
	}

	componentDidMount() {
		NetInfo.isConnected.addEventListener(
			'connectionChange',
			this.handleConnectivityChange
		)
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener(
			'connectionChange',
			this.handleConnectivityChange
		)
	}

	handleConnectivityChange = isConnected => {
		if (isConnected) {
			this.setState({ isConnected })
		} else {
			this.setState({ isConnected })
		}
	}

	render() {
		if (!this.state.isConnected) {
			return <MiniOfflineSign />
		}
		return null
	}
}

const styles = StyleSheet.create({
	offlineContainer: {
		backgroundColor: '#b52424',
		height: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width
	},
	offlineText: { color: 'white' }
})

export default OfflineNotice
