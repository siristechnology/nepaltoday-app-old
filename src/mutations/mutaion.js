import { commitMutation } from 'react-relay'
import environment from '../Environment'

export default (
	mutation = '',
	variables = {},
	onCompleted = f => f,
	onError = f => f,
) => {
	commitMutation(environment, {
		mutation,
		variables,
		onCompleted: data => onCompleted(data),
		onError: err => onError(err),
	})
}
