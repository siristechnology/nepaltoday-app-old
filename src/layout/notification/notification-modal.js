import React from 'react'
import { Text } from 'react-native-ui-kitten'
import { ModalComponent } from '../../components/common/modal.component'

export const NotificationModal = ({ notification }) => {
	console.log('_______________notification-modal on nodal and modal data_______________', notification)
	if (!notification) {
		return null
	}
	return (
		<ModalComponent visible={!!notification.message}>
			<Text>{notification.title}</Text>
			<Text>{notification.message}</Text>
		</ModalComponent>
	)
}
