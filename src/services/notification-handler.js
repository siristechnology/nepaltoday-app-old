import messaging from '@react-native-firebase/messaging'
import client from '../../src/graphql/graphql-client'
import gql from 'graphql-tag'
import * as RNLocalize from 'react-native-localize'
import crashlytics from '@react-native-firebase/crashlytics'
import moment from 'moment'

class NotificationHandler {
	register = (user) => {
		messaging()
			.getToken()
			.then((token) => this.storeFcmToken(user, token))
	}

	checkForNotification() {
		return new Promise((resolve, reject) => {
			messaging()
				.getInitialNotification()
				.then((notify) => {
					if (notify != null) {
						this.fetchArticle(notify)
							.then((res) => {
								resolve(res)
							})
							.catch((err) => reject(err))
					} else {
						reject({ message: 'Notification not clicked' })
					}
				})
				.catch((err) => reject(err))
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

	fetchArticle(notify) {
		return new Promise((resolve, reject) => {
			client
				.query({
					query: GET_ARTICLE_QUERY,
					variables: { _id: notify.data._id },
				})
				.then((res) => {
					console.log('printing res', res)
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

export default new NotificationHandler()
