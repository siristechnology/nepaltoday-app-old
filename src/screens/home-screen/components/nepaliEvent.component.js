import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { StyleSheet, View } from 'react-native'
import crashlytics from '@react-native-firebase/crashlytics'
import { getNepaliDate } from '../../../helper/dateFormatter'
import { useTheme, Text } from 'react-native-paper'

const NepaliEvent = () => {
	const nepaliDate = getNepaliDate()

	const FETCH_NEPALI_EVENT = gql`
        query getNepaliEvent {
            getNepaliEvent(date:"${nepaliDate}"){
                isHoliday
                tithi
                event
                day
                dayInEn
                en
            }
        }
    `

	const { loading, data, error } = useQuery(FETCH_NEPALI_EVENT, {
		variables: {},
	})
	console.log('printing loading, data, error:   ', loading, data, error)

	if (error) {
		crashlytics().recordError(new Error('nepali event Api error' + error.message))
	}

	const theme = useTheme()

	if (!loading && !error && !!data.getNepaliEvent) {
		let { isHoliday, tithi, event } = data.getNepaliEvent
		if (!tithi) return null

		return (
			<View testID="nepaliEventComponent" style={styles.containerStyle}>
				<Text style={[styles.eventTextStyle, { color: (isHoliday && '#e57373') || theme.colors.secondary }]}>
					{(event != '--' && event + ', ') || ''}
					{tithi}
				</Text>
			</View>
		)
	} else {
		return null
	}
}

const styles = StyleSheet.create({
	containerStyle: {
		display: 'flex',
		marginLeft: 3,
	},
	eventTextStyle: {
		fontSize: 12,
	},
	tithiTextStyle: {
		fontSize: 12,
	},
})

export default NepaliEvent
