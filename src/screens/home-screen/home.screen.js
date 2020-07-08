import { Text, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { ArticleListContainer } from '../../layout/article'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import Weather from './components/weather.component'
import crashlytics from '@react-native-firebase/crashlytics'
import actionCreators from '../../ducks/actions'

const Home = ({ navigation, articles, actions }) => {
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)

	actions.startToOpenArticle()

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	useEffect(() => {
		setNepaliDate(getFormattedCurrentNepaliDate())
		crashlytics().log('Home page test log.')
	}, [])

	const { loading, data, refetch, error } = useQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	if (error) {
		console.log('printing error', error)
		crashlytics().recordError(new Error(error))
	}

	if (!loading && !articles) {
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

function mapStateToProps(state) {
	return { articles: state.articles }
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
