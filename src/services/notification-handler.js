import messaging from '@react-native-firebase/messaging'
// import AsyncStorage from '@react-native-community/async-storage'
import client from '../../src/graphql/graphql-client'
import navigationService from './navigationService'
import gql from 'graphql-tag'
import * as RNLocalize from 'react-native-localize'

class NotificationHandler {
	register = () => {
		messaging()
			.getToken()
			.then((token) => this.storeFcmToken(token))

		messaging().setBackgroundMessageHandler(this.onBackgroundMessageReceived)

		messaging().onNotificationOpenedApp((msg) => console.log('inside onNotificationOpenedApp', msg))

		messaging()
			.getInitialNotification()
			.then(this.onOpenNotification)
	}

	storeFcmToken = async (token) => {
		client
			.mutate({
				mutation: STORE_FCM_MUTATION,
				variables: {
					input: {
						fcmToken: token,
						countryCode: RNLocalize.getCountry(),
						timeZone: RNLocalize.getTimeZone(),
					},
				},
			})
			.catch((reason) => console.log(reason))
	}

	onBackgroundMessageReceived = async () => {}

	onOpenNotification = async (notify) => {
		if (notify != null) {
			const { data, errors } = await client
				.query({
					query: GET_ARTICLE_QUERY,
					variables: { _id: notify.data._id },
				})
				.catch((reason) => console.log('printing reason', reason))

			if (errors) {
				console.log('printing errors', errors)
				crashlytics().recordError(error)
			}

			navigationService.navigate('ArticleDetail', { article: data.getArticle })
		}
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

export default notificationHandler = new NotificationHandler()
