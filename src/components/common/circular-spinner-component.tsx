import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Spinner } from 'react-native-ui-kitten/ui'

export const CircularSpinner = () => (
	<Layout style={styles.container}>
		<Spinner />
	</Layout>
)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
		paddingVertical: 4,
		paddingHorizontal: 4,
	},
})
