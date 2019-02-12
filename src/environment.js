// import { AsyncStorage } from "react-native";
import {
	Environment,
	Network,
	RecordSource,
	Store,
} from 'relay-runtime';
import global from '../global';

async function fetchQuery (operation, variables) {
	// const userContext = await AsyncStorage.getItem('userContext');
	return fetch(global.nepalTodayServer, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 'Authorization': 'Bearer ' + JSON.parse(userContext).token
		},
		body: JSON.stringify({
			query: operation.text,
			variables,
		}),
	}).then(response => {
		return response.json();
	});
}

const environment = new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource()),
});

export default environment;