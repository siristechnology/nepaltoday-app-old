import React from 'react'
import { Text } from '@ui-kitten/components'
import { ModalComponent } from '../../components/common/modal.component'

export const NotificationModal = ({ notification }) => {
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
