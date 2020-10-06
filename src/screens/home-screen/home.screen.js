import { Text, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { ArticleListContainer } from './components'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import Weather from './components/weather.component'
import crashlytics from '@react-native-firebase/crashlytics'
import { fetchfromAsync, storetoAsync } from '../../helper/cacheStorage'

const Home = ({ navigation }) => {
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [localArticles, setLocalArticles] = useState({ getArticles: [] })

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	const fetchArticlesFromAsyncStorage = async () => {
		fetchfromAsync()
			.then((res) => {
				setLocalArticles({ getArticles: res })
			})
			.catch((err) => {
				crashlytics().recordError(err)
				setLocalArticles([])
			})
	}

	useEffect(() => {
		getFormattedCurrentNepaliDate().then((npDate) => {
			setNepaliDate(npDate)
		})
		fetchArticlesFromAsyncStorage()
	}, [])

	const { loading, data, refetch, error } = useQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	if (!loading && data != null && data.getArticles && data.getArticles.length) {
		const myArticles = data.getArticles
		storetoAsync(myArticles)
	}

	if (error) {
		crashlytics().recordError(new Error(error))
	}

	const dataArticles = (data && data.getArticles) || []

	const homeArticles = (dataArticles || localArticles.getArticles).filter(x=>x.category!='cartoon') 

	return (
		<AppLayout>
			<View style={style.headerStyle}>
				<Text style={style.nepaliDateStyle}>{nepaliDate}</Text>
				<Weather />
			</View>
			<ArticleListContainer
				navigation={navigation}
				articles={homeArticles}
				refreshing={refreshing}
				handleRefresh={handleRefresh}
			/>
		</AppLayout>
	)
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
			tags
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
	nepaliDateStyle: {
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
	},
	screenStyle: {
		backgroundColor: '#000000',
		paddingTop: 500,
	},
})

export default Home
