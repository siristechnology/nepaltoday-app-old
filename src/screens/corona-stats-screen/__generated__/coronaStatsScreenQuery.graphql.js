/**
 * @flow
 * @relayHash 1884b459ff36c881577d2dc41caf3baa
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type coronaStatsScreenQueryVariables = {||};
export type coronaStatsScreenQueryResponse = {|
  +getLatestCoronaStats: ?{|
    +createdDate: ?string,
    +stats: ?$ReadOnlyArray<?{|
      +country: ?string,
      +total_cases: ?number,
      +total_deaths: ?number,
      +new_cases: ?number,
      +new_deaths: ?number,
    |}>,
  |}
|};
export type coronaStatsScreenQuery = {|
  variables: coronaStatsScreenQueryVariables,
  response: coronaStatsScreenQueryResponse,
|};
*/


/*
query coronaStatsScreenQuery {
  getLatestCoronaStats {
    createdDate
    stats {
      country
      total_cases
      total_deaths
      new_cases
      new_deaths
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "getLatestCoronaStats",
    "storageKey": null,
    "args": null,
    "concreteType": "CoronaStats",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "createdDate",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "stats",
        "storageKey": null,
        "args": null,
        "concreteType": "CoronaMetrics",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "country",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "total_cases",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "total_deaths",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "new_cases",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "new_deaths",
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
    "name": "coronaStatsScreenQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "coronaStatsScreenQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "coronaStatsScreenQuery",
    "id": null,
    "text": "query coronaStatsScreenQuery {\n  getLatestCoronaStats {\n    createdDate\n    stats {\n      country\n      total_cases\n      total_deaths\n      new_cases\n      new_deaths\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '487549f98cb8f92df88d433cfca778a7';

module.exports = node;
