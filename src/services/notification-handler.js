import client from '../../src/graphql/graphql-client'
import gql from 'graphql-tag'
import * as RNLocalize from 'react-native-localize'
import crashlytics from '@react-native-firebase/crashlytics'
import moment from 'moment'

class NotificationHandler {
	register = (user, token) => {
		this.storeFcmToken(user, token)
	}

	handleNotificationClick(articleId) {
		return new Promise((resolve, reject) => {
			if (articleId) {
				this.fetchArticle(articleId)
					.then((res) => {
						resolve(res)
					})
					.catch((err) => reject(err))
			} else {
				reject(new Error('FCMToken Not found'))
			}
		})
	}

	storeFcmToken = async (user, token) => {
		client
			.mutate({
				mutation: STORE_FCM_MUTATION,
				variables: {
					input: {
						nid: user.uid,
						fcmToken: token,
						countryCode: RNLocalize.getCountry(),
						timeZone: RNLocalize.getTimeZone(),
						modifiedDate: moment.utc(),
					},
				},
			})
			.catch((reason) => console.log(reason))
	}

	fetchArticle(id) {
		return new Promise((resolve, reject) => {
			client
				.query({
					query: GET_ARTICLE_QUERY,
					variables: { _id: id },
				})
				.then((res) => {
					resolve(res)
				})
				.catch((error) => {
					console.log('printing error', error)
					crashlytics().recordError(error)
					reject(error)
				})
		})
	}
}

const STORE_FCM_MUTATION = gql`
	mutation storeFcmMutation($input: StoreFcmInput!) {
		storeFcmToken(input: $input) {
			success
		}
	}
`

const GET_ARTICLE_QUERY = gql`
	query articleQuery($_id: String!) {
		getArticle(_id: $_id) {
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
`

export default new NotificationHandler()
