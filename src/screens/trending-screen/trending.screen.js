import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import TrendingListContainer from './components/trendingListContainer'
import crashlytics from '@react-native-firebase/crashlytics'

const TrendingComponent = () => {
	const [refreshing, setRefreshing] = useState(false)

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	const { loading, data, refetch, error } = useQuery(GET_TRENDING, {
		variables: {},
	})

	if (error) {
		crashlytics().recordError(new Error('Trending Api error' + error.message))
	}

	if (loading) {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	}

	const trendings = (data && data.getTrending && data.getTrending.trendings) || []

	return (
		<AppLayout>
			<View style={style.headerStyle}>
				<Text style={style.textStyle}>Trending Figures</Text>
			</View>
			<TrendingListContainer trending={trendings} refreshing={refreshing} onRefresh={handleRefresh} />
		</AppLayout>
	)
}

const style = StyleSheet.create({
	headerStyle: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	textStyle: {
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
	},
})

const GET_TRENDING = gql`
	query TrendingScreenQuery {
		getTrending {
			createdAt
			trendings {
				category
				counts {
					name
					handle
					count
					image
				}
			}
		}
	}
`

export default TrendingComponent
