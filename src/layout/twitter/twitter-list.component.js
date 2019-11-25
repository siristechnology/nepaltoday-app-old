import React from 'react'
import { RefreshControl } from 'react-native'
import { List } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import { TwitterListItem } from './twitter-list-item.component'

const TwitterListComponent = ({ tweets, themedStyle, handleRefresh }) => {
	const renderItem = info => {
		return <TwitterListItem style={themedStyle.item} tweet={info.item} />
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

export const TwitterList = withStyles(TwitterListComponent, theme => ({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: theme['background-basic-color-2'],
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
