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
import { getLocalStoredArticles, setRealmArticles } from '../../helper/realm'

const Home = ({ navigation }) => {
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [localArticles, setLocalArticles] = useState([])

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	async function customTrace() {
		const trace = await perf().startTrace('custom_trace_beta')
		trace.putAttribute('user', auth().currentUser.uid)
		await trace.stop()
	}

	useEffect(() => {
		setNepaliDate(getFormattedCurrentNepaliDate())
		crashlytics().log('Home page test log.')
		setLocalArticles({getArticles:getLocalStoredArticles()})
		customTrace()
	}, [])

	const { loading, data, refetch, error } = useQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	if(!loading && data!=null && data.getArticles && data.getArticles.length){
		let myArticles = data.getArticles
		setRealmArticles(myArticles)
	}

	if (error) {
		console.log('printing error', error)
		crashlytics().recordError(new Error(error))
	}

	
	return (
		<AppLayout>
			<View style={style.headerStyle}>
				<Text style={style.textStyle}>{nepaliDate}</Text>
				<Weather />
			</View>
			<ArticleListContainer 
				navigation={navigation} 
				articles={data && data.getArticles && data.getArticles.length && data || localArticles} 
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
