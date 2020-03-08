// import { AsyncStorage } from "react-native";
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { QueryResponseCache } from 'relay-runtime/lib/index'
import { NEPALTODAY_SERVER } from 'react-native-dotenv';

const cacheTtl = 30 * 1000 // if someone refreshes in 30 seconds, they will get content from cache for now
const cache = new QueryResponseCache({ size: 1000, ttl: cacheTtl })

async function fetchQuery(operation, variables, cacheConfig) {
	const queryID = operation.text
	const isMutation = operation.operationKind === 'mutation'
	const isQuery = operation.operationKind === 'query'
	const forceFetch = cacheConfig && cacheConfig.force
	// const userContext = await AsyncStorage.getItem('userContext');

	// Try to get data from cache on queries
	const fromCache = cache.get(queryID, variables)
	if (isQuery && fromCache !== null && !forceFetch) {
		console.log('serving from cache')
		return fromCache
	}

	// Otherwise, fetch data from server
	return fetch(NEPALTODAY_SERVER, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 'Authorization': 'Bearer ' + JSON.parse(userContext).token
		},
		body: JSON.stringify({
			query: operation.text,
			variables,
		}),
	})
		.then(response => {
			return response.json()
		})
		.then(json => {
			// Update cache on queries
			if (isQuery && json) {
				cache.set(queryID, variables, json)
			}
			// Clear cache on mutations
			if (isMutation) {
				console.log('cache being cleared')
				cache.clear()
			}

			return json
		})
}

const environment = new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource()),
})

export default environment
