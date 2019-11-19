import React from 'react'

import { StyleSheet, View } from 'react-native'

import { MutedText } from '../styled'
import { getRelativeTime } from '../helper/time'

const Time = ({ value }) => {
	const relativTime = getRelativeTime(value)
	return (
		<View style={styles.timeWrapper}>
			<MutedText>{relativTime}</MutedText>
		</View>
	)
}

export { Time }

const styles = StyleSheet.create({
	timeWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		padding: 8,
		fontSize: 16,
	},
})
