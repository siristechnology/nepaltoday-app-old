import React from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import { TwitterListItem } from './twitter-list-item.component'

const TwitterList = React.memo(({ tweets, refreshing, handleRefresh, header }) => {
	const renderItem = (info) => {
		return <TwitterListItem style={themedStyle.item} tweet={info.item} />
	}

	const ref = React.useRef(null)
	useScrollToTop(ref)

	return (
		<FlatList
			ListHeaderComponent={header}
			contentContainerStyle={themedStyle.container}
			data={tweets}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ref={ref}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

const themedStyle = StyleSheet.create({
	// container: {
	// 	backgroundColor: theme['background-basic-color-4'],
	// },
	// item: {
	// 	marginVertical: 8,
	// 	backgroundColor: theme['background-basic-color-1'],
	// },
})

export default TwitterList
