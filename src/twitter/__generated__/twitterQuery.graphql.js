/**
 * @flow
 * @relayHash d660f5e41abf0a47fd262f285c648f33
 */

/* eslint-disable */

'use strict'

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type twitterQueryVariables = {||};
export type twitterQueryResponse = {|
  +getTweets: $ReadOnlyArray<?{|
    +_id: string,
    +text: ?string,
    +name: ?string,
    +profileImage: ?string,
    +description: ?string,
    +publishedDate: ?string,
    +twitterHandle: ?{|
      +_id: string,
      +name: ?string,
      +handle: ?string,
      +category: ?string,
    |},
  |}>
|};
export type twitterQuery = {|
  variables: twitterQueryVariables,
  response: twitterQueryResponse,
|};
*/

/*
query twitterQuery {
  getTweets {
    _id
    text
    name
    profileImage
    description
    publishedDate
    twitterHandle {
      _id
      name
      handle
      category
    }
  }
}
*/

const node /*: ConcreteRequest*/ = (function() {
	var v0 = {
			kind: 'ScalarField',
			alias: null,
			name: '_id',
			args: null,
			storageKey: null
		},
		v1 = {
			kind: 'ScalarField',
			alias: null,
			name: 'name',
			args: null,
			storageKey: null
		},
		v2 = [
			{
				kind: 'LinkedField',
				alias: null,
				name: 'getTweets',
				storageKey: null,
				args: null,
				concreteType: 'Tweet',
				plural: true,
				selections: [
					(v0 /*: any*/),
					{
						kind: 'ScalarField',
						alias: null,
						name: 'text',
						args: null,
						storageKey: null
					},
					(v1 /*: any*/),
					{
						kind: 'ScalarField',
						alias: null,
						name: 'profileImage',
						args: null,
						storageKey: null
					},
					{
						kind: 'ScalarField',
						alias: null,
						name: 'description',
						args: null,
						storageKey: null
					},
					{
						kind: 'ScalarField',
						alias: null,
						name: 'publishedDate',
						args: null,
						storageKey: null
					},
					{
						kind: 'LinkedField',
						alias: null,
						name: 'twitterHandle',
						storageKey: null,
						args: null,
						concreteType: 'TwitterHandle',
						plural: false,
						selections: [
							(v0 /*: any*/),
							(v1 /*: any*/),
							{
								kind: 'ScalarField',
								alias: null,
								name: 'handle',
								args: null,
								storageKey: null
							},
							{
								kind: 'ScalarField',
								alias: null,
								name: 'category',
								args: null,
								storageKey: null
							}
						]
					}
				]
			}
		]
	return {
		kind: 'Request',
		fragment: {
			kind: 'Fragment',
			name: 'twitterQuery',
			type: 'Query',
			metadata: null,
			argumentDefinitions: [],
			selections: (v2 /*: any*/)
		},
		operation: {
			kind: 'Operation',
			name: 'twitterQuery',
			argumentDefinitions: [],
			selections: (v2 /*: any*/)
		},
		params: {
			operationKind: 'query',
			name: 'twitterQuery',
			id: null,
			text:
				'query twitterQuery {\n  getTweets {\n    _id\n    text\n    name\n    profileImage\n    description\n    publishedDate\n    twitterHandle {\n      _id\n      name\n      handle\n      category\n    }\n  }\n}\n',
			metadata: {}
		}
	}
})()
// prettier-ignore
;(node/*: any*/).hash = '736652627dbc1db87990a5830b11362e';
module.exports = node
