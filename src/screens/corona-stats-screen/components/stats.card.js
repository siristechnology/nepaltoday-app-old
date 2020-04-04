import React from 'react'
import { View } from 'react-native'
import { Text, Card } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import { textStyle } from '../../../components/common'
import MetricComponent from './metric.component'

const StatsComponent = (props) => {
	const { style, hint, value, icon, themedStyle, statMetric } = props

	return (
		<Card>
			<View style={themedStyle.profileSocialsContainer}>
				<Text>{statMetric.country}</Text>
				<View
					style={{
						borderLeftWidth: 1,
						borderLeftColor: '#d9dbde',
					}}
				/>
				<MetricComponent hint="Total Cases" value={`${statMetric.total_cases}`} />
				<MetricComponent hint="Total Deaths" value={`${statMetric.total_deaths}`} />
				<MetricComponent hint="New Cases" value={`${statMetric.new_cases}`} />
				<MetricComponent hint="New Deaths" value={`${statMetric.new_deaths}`} />
			</View>
		</Card>
	)
}

export default StatsCard = withStyles(StatsComponent, (theme) => ({
	profileSocialsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 24,
	},
	container: {
		marginVertical: 1,
		backgroundColor: '#FFFFFF',
	},
	tweetWrapper: {
		padding: 4,
		marginVertical: 6,
		flexDirection: 'row',
	},
	rightWrapper: {
		flex: 1,
	},
	headerWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 4,
		alignItems: 'center',
	},
	avatar: {
		minWidth: 40,
		margin: 10,
	},
	titleLabel: {
		...textStyle.caption1,
		fontWeight: 'bold',
	},
	descriptionLabel: {
		marginLeft: 4,
		...textStyle.subtitle,
	},
	detailsContainer: {
		paddingTop: 2,
	},
	tweetText: {
		flex: 1,
		flexWrap: 'wrap',
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
	},
	dateLabel: {
		marginLeft: 4,
		...textStyle.paragraph,
	},
	dateIcon: {
		width: 16,
		height: 16,
		tintColor: theme['text-hint-color'],
	},
}))
