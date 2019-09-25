/**
 * @flow
 * @relayHash 1ce7541bbb60cdecc041c40fe47bf25b
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type twitterQueryVariables = {||};
export type twitterQueryResponse = {|
  +getTweets: $ReadOnlyArray<?{|
    +_id: string,
    +text: ?string,
    +name: ?string,
    +tweetId: ?string,
    +handle: ?string,
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
    tweetId
    handle
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

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "handle",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "getTweets",
    "storageKey": null,
    "args": null,
    "concreteType": "Tweet",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "text",
        "args": null,
        "storageKey": null
      },
      (v1/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "tweetId",
        "args": null,
        "storageKey": null
      },
      (v2/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "profileImage",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "description",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "publishedDate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "twitterHandle",
        "storageKey": null,
        "args": null,
        "concreteType": "TwitterHandle",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "category",
            "args": null,
            "storageKey": null
          }
        ]
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
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "twitterQuery",
    "argumentDefinitions": [],
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "twitterQuery",
    "id": null,
    "text": "query twitterQuery {\n  getTweets {\n    _id\n    text\n    name\n    tweetId\n    handle\n    profileImage\n    description\n    publishedDate\n    twitterHandle {\n      _id\n      name\n      handle\n      category\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a616979a38a1f60c917f78cac6a45b95';
module.exports = node;
