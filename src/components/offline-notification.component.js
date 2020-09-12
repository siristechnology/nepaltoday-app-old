import React, { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

const OfflineNotice = () => {
	const [isConnected, setConnected] = useState(true)

	useEffect(() => {
		NetInfo.fetch().then((state) => {
			setConnected(state.isConnected)
		})
	})

	if (!isConnected) {
		return (
			<View style={styles.offlineContainer}>
				<Text style={styles.offlineText}>कृपया इन्टरनेट जाँच गर्नुहोस्</Text>
			</View>
		)
	} else {
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
		width,
	},
	offlineText: { color: 'white' },
	refreshIcon: {
		alignSelf: 'center',
		width: 30,
		height: 30,
		marginTop: 8,
		color: 'white',
	},
})

export { OfflineNotice }
