import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'
import RNBootSplash from 'react-native-bootsplash'
import crashlytics from '@react-native-firebase/crashlytics'

import AppLayout from '../../frame/app-layout'
import { ArticleListContainer } from './components'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import Weather from './components/weather.component'
import { fetchfromAsync, storetoAsync } from '../../helper/cacheStorage'
import { HeadlineComponent } from './components/headline.component'
import auth from '@react-native-firebase/auth'
import StoryHeadline from './components/storyHeadline/storyHeadline'

const Home = ({ navigation }) => {
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [localArticles, setLocalArticles] = useState({ getArticles: [] })

	const [fetchNews, { loading, data, refetch, error }] = useLazyQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

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
		RNBootSplash.hide()

		getFormattedCurrentNepaliDate().then((npDate) => {
			setNepaliDate(npDate)
		})
		fetchArticlesFromAsyncStorage()
		fetchNews()
	}, [fetchNews])

	if (!loading && data != null && data.getArticles && data.getArticles.length) {
		const myArticles = data.getArticles
		storetoAsync(myArticles)
	}

	if (error) {
		crashlytics().recordError(new Error(error))
	}

	const dataArticles = (data && data.getArticles) || []
	const homeArticles = (dataArticles.length && dataArticles) || localArticles.getArticles
	console.log(homeArticles.length)
	const topHeadline = homeArticles.find((a) => a.category === 'headline') || homeArticles[0]
	const headlineArticles = homeArticles.filter(x => x.category == 'headline') || []
	console.log(headlineArticles.length)
	const topNews = homeArticles
		.filter((a) => a._id !== topHeadline._id)
		.sort((a, b) => b.totalWeight - a.totalWeight)
		.slice(0, 100)

	const headerComponent = (
		<View>
			<View style={style.headerStyle}>
				<Text testID="nepaliDate" style={style.nepaliDateStyle}>
					{nepaliDate}
				</Text>
				<Weather />
			</View>
			<StoryHeadline
				headlineArticles={headlineArticles}
				onShowArticleDetail={(article, articles) => navigation.navigate('ArticleDetail', { article, articles })}
			/>
			<HeadlineComponent
				article={topHeadline}
				style={style.headline}
				onPress={() => navigation.navigate('ArticleDetail', { article: topHeadline, articles: homeArticles })}
			/>
		</View>
	)

	return (
		<AppLayout>
			<ArticleListContainer
				headerComponent={headerComponent}
				navigation={navigation}
				articles={topNews}
				refreshing={refreshing}
				handleRefresh={handleRefresh}
			/>
		</AppLayout>
	)
}

export const GET_ARTICLES_QUERY = gql`
	query homeScreenQuery {
		getArticles(
			criteria: {
				categories: [
					{ name: "headline", count: 10 }
					{ name: "politics", count: 10 }
					{ name: "entertainment", count: 10 }
					{ name: "news", count: 5 }
					{ name: "business", count: 5 }
					{ name: "sports", count: 10 }
					{ name: "social", count: 5 }
				],
				nid: "${auth().currentUser && auth().currentUser.uid || ''}"
			}
		) {
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
			totalWeight
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
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#F5F0F0',
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
	headline: {
		marginVertical: 4,
		borderBottomWidth: 1,
		borderBottomColor: '#F5F0F0',
	},
})

export default Home
