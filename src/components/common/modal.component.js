import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Modal, Layout } from 'react-native-ui-kitten'

export const ModalComponent = ({ children, visible }) => {
	return (
		<Modal visible={visible}>
			<Layout level="3" style={styles.modalContainer}>
				{children}
			</Layout>
		</Modal>
	)
}

export const useModal = (state = false) => {
	const [visible, setVisible] = useState(state)
	return {
		open: () => setVisible(true),
		close: () => setVisible(false),
		props: {
			onClose: () => setVisible(false),
			visible,
		},
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	modalContainer: {
		width: 200,
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
