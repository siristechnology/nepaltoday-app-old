import { all, takeEvery, put } from 'redux-saga/effects'
import types from './types.js'
// import environment from '../../environment.js';
import client from '../graphql/graphql-client'
import gql from 'graphql-tag'

const watchFetchFromCache = function* watchFetchFromCache() {
	yield takeEvery(types.FETCH_FROM_CACHE_START, function* (input) {
		// fetch from realm
		console.log('printing FETCH_FROM_CACHE_START')

		// after fetching from cache
		yield put({ type: 'FETCH_FROM_CACHE_END', articles: 'articles from cache' })
	})
}

const watchRefreshCache = function* watchRefreshCache() {
	yield takeEvery(types.REFRESH_CACHE_START, function* (input) {
		// fetch from mongo
		console.log('printing REFRESH_CACHE_START')

		const articles = yield client.query({
			query: gql`
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
			`,
		})

		// save in realm

		// after fetching from cache
		yield put({ type: 'REFRESH_CACHE_END', articles: 'latest articles from server' })
	})
}

const homeSaga = function* homeSaga() {
	yield all([watchFetchFromCache(), watchRefreshCache()])
}

export default homeSaga
