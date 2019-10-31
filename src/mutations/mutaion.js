import { commitMutation } from 'react-relay'
import environment from '../environment'

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
