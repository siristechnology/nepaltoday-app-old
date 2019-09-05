/**
 * @flow
 * @relayHash d22baffbe28141f8cddf875b3ff53457
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
v1 = [
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "handle",
            "args": null,
            "storageKey": null
          },
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
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "twitterQuery",
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "twitterQuery",
    "id": null,
    "text": "query twitterQuery {\n  getTweets {\n    _id\n    text\n    twitterHandle {\n      _id\n      name\n      handle\n      category\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '986834ef7725826f12e2341bc3afd2e9';
module.exports = node;
