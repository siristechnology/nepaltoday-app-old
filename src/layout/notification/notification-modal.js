import React from 'react'
import { Text } from 'react-native-ui-kitten'
import { ModalComponent } from '../../components/common/modal.component'

export const NotificationModal = ({ visible, modalData }) => {
	console.log(
		'_______________notification-modal on nodal and modal data_______________',
		visible,
		modalData,
	)
	return (
		<ModalComponent visible={visible}>
			<Text>{modalData.title}</Text>
			<Text>{modalData.message}</Text>
		</ModalComponent>
	)
}
