/**
 * @flow
 * @relayHash 78703ac050f805277d631e0aa3f063b6
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type twitterQueryVariables = {||};
export type twitterQueryResponse = {|
  +getTweets: $ReadOnlyArray<?{|
    +_id: string,
    +handle: ?string,
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
    handle
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "getTweets",
    "storageKey": null,
    "args": null,
    "concreteType": "Tweet",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "_id",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "handle",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "twitterQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "twitterQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "twitterQuery",
    "id": null,
    "text": "query twitterQuery {\n  getTweets {\n    _id\n    handle\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4e45784e97648a8f8dc70a72e0c6c4f1';
module.exports = node;
