import { Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useNetInfo } from '@react-native-community/netinfo'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

const OfflineNotice = () => {
	const netInfo = useNetInfo()
	const [isConnected, setConnected] = useState(true)
	const [refreshCounter, setRefeshCounter] = useState(0)

	useEffect(() => {
		setConnected(netInfo.isConnected)
	}, [netInfo])

	if (!isConnected) {
		return (
			<View style={styles.offlineContainer}>
				<Text style={styles.offlineText}>
					कृपया इन्टरनेट जाँच गर्नुहोस्
				</Text>
				<Icon
					onPress={() => setRefeshCounter(refreshCounter + 1)}
					type="EvilIcons"
					name="refresh"
					style={styles.refreshIcon}
				/>
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
