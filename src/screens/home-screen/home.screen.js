import { AppState, Text, StyleSheet, View } from 'react-native'
import Analytics from 'appcenter-analytics'
import React, { useState, useEffect, useCallback } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { ArticleListContainer } from '../../layout/article'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import Weather from './components/weather.component'

export const GET_ARTICLES_QUERY = gql`
	query homeScreenQuery {
		getArticles {
			_id
			title
			shortDescription
			content
			link
			imageLink
			publishedDate
			modifiedDate
			category
			source {
				_id
				name
				logoLink
			}
		}
	}
`

const Home = ({ navigation }) => {
	// const [isUpdated, setUpdated] = useState(false)
	// const [appState, setAppState] = useState(AppState.currentState)
	const [nepaliDate, setNepaliDate] = useState('')

	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = () => {
		console.log('printing handleRefresh', handleRefresh);

		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}

	// const updateAppState = (nextAppState) => {
	// 	if (appState.match(/inactive|background/) && nextAppState === 'active') {
	// 		handleRefresh()
	// 	}
	// 	setAppState(nextAppState)
	// }

	useEffect(() => {
		Analytics.trackEvent('Home page loaded')
		// AppState.addEventListener('change', updateAppState)
		setNepaliDate(getFormattedCurrentNepaliDate())
		// return () => {
		// 	AppState.removeEventListener('change', updateAppState)
		// }
	}, [])

	const { loading, data, refetch } = useQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	console.log('refetching data')

	if (!loading) {
		return (
			<AppLayout>
				<View style={style.headerStyle}>
					<Text style={style.textStyle}>{nepaliDate}</Text>
					<Weather />
				</View>
				<ArticleListContainer navigation={navigation} articles={data} refreshing={refreshing} handleRefresh={handleRefresh} />
			</AppLayout>
		)
	} else {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	}
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
	timeTextStyle: {
		fontWeight: 'bold',
		fontSize: 22,
		paddingTop: 5,
		paddingLeft: 20,
	},
})

export default Home
