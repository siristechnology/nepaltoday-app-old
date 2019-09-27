import React from 'react'
import { View, Icon } from 'native-base'
import { StyleSheet } from 'react-native'

import { MutedText } from '../styled'
import { getRelativeTime } from '../helper/time'

const Time = ({ value }) => {
	const relativTime = getRelativeTime(value)
	return (
		<View style={styles.timeWrapper}>
			<Icon type="AntDesign" name="clockcircleo" style={styles.icon} />
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
