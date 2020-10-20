import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'

export const CircularSpinner = () => (
	<View style={styles.container}>
		<ActivityIndicator animating={true} color={Colors.red800} />
	</View>
)

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	spinner: {},
})
