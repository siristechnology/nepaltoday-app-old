import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { StyleSheet, View, Text } from 'react-native'
import crashlytics from '@react-native-firebase/crashlytics'
import { getNepaliDate } from '../../../helper/dateFormatter'

const NepaliEvent = () => {
    
    const FETCH_NEPALI_EVENT = gql`
        query getNepaliEvent {
            getNepaliEvent(date:"${getNepaliDate()}"){
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

	if (error) {
		crashlytics().recordError(new Error('nepali event Api error' + error.message))
	}

	if (!loading && !error && !!data.getNepaliEvent) {
		let { isHoliday, tithi, event } = data.getNepaliEvent
		if (!isHoliday) return null

		return (
			<View testID="nepaliEventComponent" style={styles.containerStyle}>
				<Text style={[styles.eventTextStyle,{ color: isHoliday && '#e57373' || '#000'}]}>
                    {event}, {tithi}
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
        marginLeft: 3
	},
	eventTextStyle: {
		fontSize: 13,
    },
    tithiTextStyle: {
        fontSize: 12,
    }
})

export default NepaliEvent
