/**
 * @flow
 * @relayHash 97433284fe594cec68238a7aa9bddf51
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type StoreFcmInput = {|
  fcmToken?: ?string,
  countryCode?: ?string,
  timeZone?: ?string,
|};
export type storeFcmMutationVariables = {|
  input: StoreFcmInput
|};
export type storeFcmMutationResponse = {|
  +storeFcmToken: ?{|
    +fcmToken: ?string,
    +countryCode: ?string,
    +timeZone: ?string,
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
    timeZone
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "timeZone",
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
    "text": "mutation storeFcmMutation(\n  $input: StoreFcmInput!\n) {\n  storeFcmToken(input: $input) {\n    fcmToken\n    countryCode\n    timeZone\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0a88da9e288d4617115aae8d26df1813';
module.exports = node;
