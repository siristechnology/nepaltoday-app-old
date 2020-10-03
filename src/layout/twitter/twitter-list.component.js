import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { withStyles } from 'react-native-ui-kitten/theme'

import { TwitterListItem } from './twitter-list-item.component'

const TwitterListComponent = React.memo(({ tweets, themedStyle, refreshing, handleRefresh, header }) => {
	const renderItem = (info) => {
		return <TwitterListItem style={themedStyle.item} tweet={info.item} />
	}

	return (
		<FlatList
			ListHeaderComponent={header}
			contentContainerStyle={themedStyle.container}
			data={tweets}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

export const TwitterList = withStyles(TwitterListComponent, (theme) => ({
	container: {
		backgroundColor: theme['background-basic-color-4'],
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
