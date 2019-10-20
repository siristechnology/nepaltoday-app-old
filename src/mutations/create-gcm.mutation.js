// 1
import { commitMutation, graphql } from 'react-relay'
import environment from '../Environment'

// 2
const mutation = graphql`
	mutation createGcmMutation($input: CreateGcmInput!) {
		createGcm(input: $input) {
			gcmToken {
				gcmToken
			}
		}
	}
`

// 3
export default (gcmToken = '', callback = f => f) => {
	// 4
	const variables = {
		input: {
			gcmToken,
			clientMutationId: '',
		},
	}

	// 5
	commitMutation(environment, {
		mutation,
		variables,
		onCompleted: () => {
			callback()
		},
		onError: err => console.error(err),
	})
}
