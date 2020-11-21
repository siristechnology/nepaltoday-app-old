import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Spinner } from '@ui-kitten/components'

export const CircularSpinner = () => (
	<Layout style={styles.container}>
		<Spinner style={styles.spinner} />
	</Layout>
)

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	spinner: {},
})
