/**
 * @flow
 * @relayHash 3e954a5cb62bbe1c2fd3fadefb6c0e01
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type twitterScreenQueryVariables = {||};
export type twitterScreenQueryResponse = {|
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
export type twitterScreenQuery = {|
  variables: twitterScreenQueryVariables,
  response: twitterScreenQueryResponse,
|};
*/


/*
query twitterScreenQuery {
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
    "name": "twitterScreenQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v3/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "twitterScreenQuery",
    "argumentDefinitions": [],
    "selections": (v3/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "twitterScreenQuery",
    "id": null,
    "text": "query twitterScreenQuery {\n  getTweets {\n    _id\n    text\n    name\n    tweetId\n    handle\n    profileImage\n    description\n    publishedDate\n    twitterHandle {\n      _id\n      name\n      handle\n      category\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9f07ea4acefad61bd563bbac23bb1527';

module.exports = node;
