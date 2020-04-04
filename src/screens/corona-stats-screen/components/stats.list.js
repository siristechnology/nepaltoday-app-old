import React from 'react'
import { RefreshControl } from 'react-native'
import { Layout, List } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import StatsCard from './stats.card'

const StatsListComponent = ({ stats, themedStyle, handleRefresh }) => {
	const renderItem = (statMetrics) => {
		return <StatsCard style={themedStyle.item} statMetric={statMetrics.item} />
	}

	return (
		<Layout style={themedStyle.container} level="2">
			<List
				data={stats.stats}
				renderItem={renderItem}
				keyExtractor={(item) => item.country}
				refreshControl={<RefreshControl colors={['#0000ff', '#689F38']} onRefresh={handleRefresh} />}
			/>
		</Layout>
	)
}

export default StatsList = withStyles(StatsListComponent, (theme) => ({
	container: {
		paddingVertical: 8,
		backgroundColor: theme['background-basic-color-2'],
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
