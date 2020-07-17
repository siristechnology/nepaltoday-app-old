import { Text, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppLayout from '../../frame/app-layout'
import { ArticleListContainer } from '../../layout/article'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import Weather from './components/weather.component'
import crashlytics from '@react-native-firebase/crashlytics'
import perf from '@react-native-firebase/perf'
import auth from '@react-native-firebase/auth'
import { CircularSpinner } from '../../components/common'
import { connect } from 'react-redux'
import types from './../../ducks/types';

const Home = (props) => {
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)

	const handleRefresh = () => {
		setRefreshing(true)
		props.getOnlineArticles()
		setRefreshing(false)
	}

	async function customTrace() {
		const trace = await perf().startTrace('custom_trace_beta')
		trace.putAttribute('user', auth().currentUser.uid)
		await trace.stop()
	}

	useEffect(() => {
		setNepaliDate(getFormattedCurrentNepaliDate())
		crashlytics().log('Home page test log.')
		props.getArticles()
		props.getOnlineArticles()
		customTrace()
	}, [])

	let data = props.articles.data;

	let dataArticles = data && data.getArticles && data.getArticles || []

	if (dataArticles.length) {
		return (
			<AppLayout>
				<View style={style.headerStyle}>
					<Text style={style.textStyle}>{nepaliDate}</Text>
					<Weather />
				</View>
				<ArticleListContainer 
					navigation={props.navigation} 
					articles={data} 
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

function mapStateToProps(state) {
	return { articles: state.homeReducer.articles }
}

const mapDispatchToProps = dispatch => ({
	getArticles: () => dispatch({ type: types.FETCH_FROM_CACHE_START }),
	getOnlineArticles: () => dispatch({type: types.REFRESH_CACHE_START})
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
