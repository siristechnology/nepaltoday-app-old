import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { withStyles } from 'react-native-ui-kitten/theme'
import { useScrollToTop } from '@react-navigation/native'

import { ArticleListItem } from './article-list-item.component'

const ArticleListComponent = React.memo(({ articles, onItemPress, themedStyle, refreshing, handleRefresh }) => {
	const _onItemPress = (article) => {
		onItemPress(article)
	}
	const renderItem = (info) => {
		return <ArticleListItem style={themedStyle.item} article={info.item} onPress={() => _onItemPress(info.item)} />
	}

	const ref = React.useRef(null)
	useScrollToTop(ref)

	return (
		<FlatList
			contentContainerStyle={themedStyle.container}
			data={articles}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ref={ref}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

export const ArticleList = withStyles(ArticleListComponent, (theme) => ({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: theme['background-basic-color-4'],
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
