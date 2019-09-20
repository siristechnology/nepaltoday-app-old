/**
 * @flow
 * @relayHash 5f662456480aab80e1066791afd62369
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type homeScreenQueryVariables = {||};
export type homeScreenQueryResponse = {|
  +getArticles: $ReadOnlyArray<?{|
    +_id: string,
    +title: string,
    +shortDescription: ?string,
    +content: ?string,
    +link: ?string,
    +imageLink: ?string,
    +publishedDate: ?string,
    +modifiedDate: ?string,
    +category: ?string,
    +source: ?{|
      +_id: string,
      +name: ?string,
      +logoLink: ?string,
    |},
  |}>
|};
export type homeScreenQuery = {|
  variables: homeScreenQueryVariables,
  response: homeScreenQueryResponse,
|};
*/


/*
query homeScreenQuery {
  getArticles {
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
    "name": "getArticles",
    "storageKey": null,
    "args": null,
    "concreteType": "Article",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "title",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "shortDescription",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "content",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "link",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "imageLink",
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
        "kind": "ScalarField",
        "alias": null,
        "name": "modifiedDate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "category",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "source",
        "storageKey": null,
        "args": null,
        "concreteType": "Source",
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
            "name": "logoLink",
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
    "name": "homeScreenQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "homeScreenQuery",
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "homeScreenQuery",
    "id": null,
    "text": "query homeScreenQuery {\n  getArticles {\n    _id\n    title\n    shortDescription\n    content\n    link\n    imageLink\n    publishedDate\n    modifiedDate\n    category\n    source {\n      _id\n      name\n      logoLink\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '07c33419d36a5183f797d2bfa88c9a36';
module.exports = node;
