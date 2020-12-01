import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { withStyles } from '@ui-kitten/components/theme'
import { useScrollToTop } from '@react-navigation/native'
import { TwitterListItem } from './twitter-list-item.component'
import { useTheme } from 'react-native-paper'

const TwitterListComponent = React.memo(({ eva, tweets, refreshing, handleRefresh, header }) => {
	const renderItem = ({ item, index }) => {
		return <TwitterListItem index={index} style={eva.style.item} tweet={item} />
	}

	const ref = React.useRef(null)
	useScrollToTop(ref)

	const theme = useTheme()

	return (
		<FlatList
			ListHeaderComponent={header}
			contentContainerStyle={[eva.style.container,{backgroundColor: theme.colors.lightBackground}]}
			data={tweets}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ref={ref}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

export const TwitterList = withStyles(TwitterListComponent, (theme) => ({
	container: {
		// backgroundColor: theme['background-basic-color-4'],
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
