import { graphql } from 'react-relay'

import mutate from './mutaion'

const gcmMutation = graphql`
	mutation storeFcmMutation($input: StoreFcmInput!) {
		storeFcmToken(input: $input) {
			fcmToken
			countryCode
			timeZone
		}
	}
`

export const storeFcmToken = (data = {}) => {
	const onSuccess = data => {
		console.log('_______________on success data_______________', data)
	}

	const onError = error => {
		console.log('_______________on error _______________', error)
	}
	const variables = {
		input: {
			...data,
		},
	}

	mutate(gcmMutation, variables, onSuccess, onError)
}
