import React from 'react'
import { View, RefreshControl } from 'react-native'
import { Layout, List, Text } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import StatsCard from './stats.card'
import { getRelativeTime } from '../../../helper/time'

const StatsListComponent = ({ stats, themedStyle, handleRefresh }) => {
	const renderItem = (statMetrics) => {
		return <StatsCard style={themedStyle.item} statMetric={statMetrics.item} />
	}

	const lastUpdated = getRelativeTime(stats.createdDate)

	return (
		<Layout style={themedStyle.container} level="2">
			<View style={themedStyle.headerStyle}>
				<Text style={themedStyle.textStyle}>Covid-19 Stats</Text>
			</View>
			<Text appearance="hint" style={{ paddingBottom: 4 }}>
				अन्तिम अपडेट गरिएको : {lastUpdated}
			</Text>
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
	headerStyle: {
		alignItems: 'center',
		paddingTop: 4,
		paddingBottom: 6,
		marginBottom: 4,
		backgroundColor: theme['background-basic-color-1'],
		borderBottomWidth: 1,
		borderBottomColor: '#d9dbde',
	},
	textStyle: {
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
	},
	item: {},
}))
