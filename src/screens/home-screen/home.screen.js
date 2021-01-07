import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
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
import NepaliEvent from './components/nepaliEvent.component'
import { Text, IconButton, useTheme } from 'react-native-paper'
import TrendingTag from './components/trendingTag.component'

const Home = ({ navigation }) => {
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [localArticles, setLocalArticles] = useState({ getArticles: [] })

	const [fetchNews, { loading, data, refetch, error, called }] = useLazyQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	const handleRefresh = () => {
		setRefreshing(true)
		if (called) {
			refetch()
				.then(() => {
					setRefreshing(false)
				})
				.catch((err) => setRefreshing(false))
		} else {
			fetchNews()
			setRefreshing(false)
		}
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
		RNBootSplash.hide().catch((err) => crashlytics().recordError(err))

		getFormattedCurrentNepaliDate().then((npDate) => {
			setNepaliDate(npDate)
		})
		fetchArticlesFromAsyncStorage().then(() => {
			fetchNews()
		})
	}, [fetchNews])

	if (!loading && data != null && data.getArticles && data.getArticles.length) {
		const myArticles = data.getArticles
		storetoAsync(myArticles)
	}

	if (error) {
		crashlytics().recordError(new Error(error))
	}

	const theme = useTheme()

	const dataArticles = (data && data.getArticles) || []

	console.log("data articles here", dataArticles.length)

	const homeArticles = (dataArticles.length && dataArticles) || localArticles.getArticles
	const topHeadline = homeArticles.find((a) => a.category === 'headline') || homeArticles[0]
	const headlineArticles = homeArticles.filter((x) => x.category == 'headline') || []
	const topNews = homeArticles
		.filter((a) => a._id !== topHeadline._id)
		.sort((a, b) => b.totalWeight - a.totalWeight)
		.slice(0, 100)

	const headerComponent = (
		<View>
			<View style={[style.headerStyle, {borderBottomColor: theme.colors.divider}]}>
				<View style={{flex:0.75}}>
					<Text testID="nepaliDate" style={style.nepaliDateStyle}>
						{nepaliDate}
					</Text>
					<NepaliEvent />
				</View>
				<View style={[style.weatherView,{flex: 0.25}]}>
					<Weather />
					<IconButton
						icon="dots-vertical"
						size={22}
						color={theme.colors.secondary}
						onPress={()=>navigation.navigate('Settings')}
					/>
				</View>
			</View>
			<StoryHeadline
				headlineArticles={headlineArticles}
				onShowArticleDetail={(article, articles) => navigation.navigate('ArticleDetail', { article, articles })}
			/>
			<TrendingTag
				navigation={navigation}
			/>
			<HeadlineComponent
				article={topHeadline}
				style={[style.headline,{borderBottomColor: theme.colors.lightBackground}]}
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
				nid: "${(auth().currentUser && auth().currentUser.uid) || ''}"
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
			likes {
				nid
			}
			dislikes {
				nid
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
	},
	nepaliDateStyle: {
		fontWeight: 'bold',
		fontSize: 24,
		paddingTop: 5,
	},
	screenStyle: {
		backgroundColor: '#000000',
		paddingTop: 500,
	},
	headline: {
		marginVertical: 4,
		borderBottomWidth: 1,
	},
	weatherView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default Home
