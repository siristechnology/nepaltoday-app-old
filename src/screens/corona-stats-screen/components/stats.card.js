import React from 'react'
import { View } from 'react-native'
import { Text, Card } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import MetricComponent from './metric.component'

const StatsComponent = (props) => {
	const { themedStyle, statMetric } = props

	return (
		<Card style={{ borderWidth: 0 }}>
			<View>
				<View style={themedStyle.headingContainer}>
					<Text category="h6">{statMetric.country}</Text>
				</View>
				<View style={themedStyle.metricsContainer}>
					<MetricComponent hint="Total Cases" value={statMetric.total_cases} />
					<MetricComponent hint="Total Deaths" value={statMetric.total_deaths} />
					<MetricComponent hint="New Cases" value={statMetric.new_cases} />
					<MetricComponent hint="New Deaths" value={statMetric.new_deaths} />
				</View>
			</View>
		</Card>
	)
}

export default StatsCard = withStyles(StatsComponent, (theme) => ({
	headingContainer: {
		alignItems: 'center',
		paddingBottom: 5,
		marginBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#d9dbde',
	},
	metricsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
}))
