import { Text, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { ArticleListContainer } from '../../layout/article'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import Weather from './components/weather.component'
import crashlytics from '@react-native-firebase/crashlytics'
import perf from '@react-native-firebase/perf'
import auth from '@react-native-firebase/auth'
import { fetchfromAsync, storetoAsync } from '../../helper/cacheStorage'
import { CircularSpinner } from '../../components/common'

const Home = ({ navigation }) => {
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [localArticles, setLocalArticles] = useState({ getArticles: [] })

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	async function customTrace() {
		const trace = await perf().startTrace('custom_trace_beta')
		trace.putAttribute('user', auth().currentUser.uid)
		await trace.stop()
	}

	fetchArticlesFromAsyncStorage = () => {
		fetchfromAsync()
			.then((res) => {
				setLocalArticles({ getArticles: res })
			})
			.catch((err) => {
				console.log(err)
				setLocalArticles([])
			})
	}

	useEffect(() => {
		setNepaliDate(getFormattedCurrentNepaliDate())
		crashlytics().log('Home page test log.')
		fetchArticlesFromAsyncStorage()
		customTrace()
	}, [])

	const { loading, data, refetch, error } = useQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	if (!loading && data != null && data.getArticles && data.getArticles.length) {
		const myArticles = data.getArticles
		storetoAsync(myArticles)
	}

	if (error) {
		console.log('printing error', error)
		crashlytics().recordError(new Error(error))
	}

	const dataArticles = (data && data.getArticles && data.getArticles) || []

	if (dataArticles.length || localArticles.getArticles.length) {
		return (
			<AppLayout>
				<View style={style.headerStyle}>
					<Text style={style.textStyle}>{nepaliDate}</Text>
					<Weather />
				</View>
				<ArticleListContainer
					navigation={navigation}
					articles={(data && data.getArticles && data.getArticles.length && data) || localArticles}
					refreshing={refreshing}
					handleRefresh={handleRefresh}
				/>
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

export const GET_ARTICLES_QUERY = gql`
	query homeScreenQuery {
		getArticles {
			_id
			title
			shortDescription
			content
			link
			imageLink
			createdDate
			modifiedDate
			category
			source {
				name
				logoLink
			}
		}
	}
`

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
