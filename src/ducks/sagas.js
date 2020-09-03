import { all, takeEvery, put } from 'redux-saga/effects'
import types from './types.js';
import client from '../graphql/graphql-client'
import gql from 'graphql-tag'
import { fetchfromAsync, storetoAsync } from '../helper/cacheStorage.js';

const watchFetchFromCache = function* watchFetchFromCache(){
	yield takeEvery(types.FETCH_FROM_CACHE_START, function* (input){
		let fetchArticles = yield fetchfromAsync()
		yield put({
			type: types.FETCH_FROM_CACHE_END,
			articles: fetchArticles
		})
	})
}

const watchRefreshCache = function* watchRefreshCache(){
	yield takeEvery(types.REFRESH_CACHE_START, function* (input){
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
						createdDate
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

		storetoAsync(articles)

		yield put({
			type: types.REFRESH_CACHE_END,
			articles: articles
		})

	})
}

const homeSaga = function* homeSaga() {
	yield all([
		watchFetchFromCache(),
		watchRefreshCache()
	])
}

export default homeSaga
