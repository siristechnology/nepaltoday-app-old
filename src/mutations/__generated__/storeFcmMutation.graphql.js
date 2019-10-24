/**
 * @flow
 * @relayHash 00ab8a2b7e640d56cec31513dd45dff3
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StoreFcmInput = {|
  fcmToken?: ?string,
  countryCode?: ?string,
|};
export type storeFcmMutationVariables = {|
  input: StoreFcmInput
|};
export type storeFcmMutationResponse = {|
  +storeFcmToken: ?{|
    +fcmToken: ?string,
    +countryCode: ?string,
  |}
|};
export type storeFcmMutation = {|
  variables: storeFcmMutationVariables,
  response: storeFcmMutationResponse,
|};
*/


/*
mutation storeFcmMutation(
  $input: StoreFcmInput!
) {
  storeFcmToken(input: $input) {
    fcmToken
    countryCode
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "StoreFcmInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "storeFcmToken",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Gcm",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "fcmToken",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "countryCode",
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
    "name": "storeFcmMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "storeFcmMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "storeFcmMutation",
    "id": null,
    "text": "mutation storeFcmMutation(\n  $input: StoreFcmInput!\n) {\n  storeFcmToken(input: $input) {\n    fcmToken\n    countryCode\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4736085d46072335038131001d3f60c1';
module.exports = node;
