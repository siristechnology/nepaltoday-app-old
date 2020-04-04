import React from 'react'
import { RefreshControl } from 'react-native'
import { List } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import StatsCard from './stats.card'

const StatsListComponent = ({ tweets, themedStyle, handleRefresh }) => {
	const renderItem = info => {
		return <StatsCard style={themedStyle.item} tweet={info.item} />
	}

	return (
		<List
			contentContainerStyle={themedStyle.container}
			data={tweets}
			renderItem={renderItem}
			keyExtractor={item => item._id}
			refreshControl={
				<RefreshControl
					colors={['#0000ff', '#689F38']}
					onRefresh={handleRefresh}
				/>
			}
		/>
	)
}

export default StatsList = withStyles(StatsListComponent, theme => ({
	container: {
		paddingVertical: 8,
		backgroundColor: theme['background-basic-color-2'],
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
