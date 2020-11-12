import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from './../../../../frame/app-layout'
import { CircularSpinner } from './../../../../components/common'
import TrendingListContainer from './components/trendingListContainer'
import crashlytics from '@react-native-firebase/crashlytics'

const TrendingComponent = (props) => {
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
			<TrendingListContainer 
				navigation={props.navigation}
				trending={trendings} 
				refreshing={refreshing} 
				onRefresh={handleRefresh} 
			/>
		</AppLayout>
	)
}

const GET_TRENDING = gql`
	query TrendingScreenQuery {
		getTrending {
			createdAt
			trendings {
				category
				counts {
					name
					nepaliName
					handle
					count
					image
				}
			}
		}
	}
`

export default TrendingComponent
