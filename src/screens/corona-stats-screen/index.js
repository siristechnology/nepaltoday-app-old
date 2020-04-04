import React, { useState } from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../../environment'
import AppLayout from '../../frame/app-layout'

import { CircularSpinner } from '../../components/common'
import StatsList from './components/stats.list'

export default CoronaStatsComponent = ({}) => {
	const [refreshCounter, setRefreshCounter] = useState(0)

	const handleRefresh = () => {
		setRefreshCounter(refreshCounter + 1)
	}

	return (
		<QueryRenderer
			environment={environment}
			query={graphql`
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
			`}
			variables={{
				refreshCounter,
			}}
			render={({ error, props }) => {
				if (!props) {
					return (
						<AppLayout>
							<CircularSpinner />
						</AppLayout>
					)
				} else if (error) {
					console.log('error:' + JSON.stringify(error))
				}
				return <StatsList stats={props.getLatestCoronaStats} handleRefresh={handleRefresh} />
			}}
		/>
	)
}
