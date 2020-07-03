import React from 'react'
import { RefreshControl } from 'react-native'
// import { List } from 'react-native-ui-kitten/ui'
import { FlatList } from 'react-navigation';
import { withStyles } from 'react-native-ui-kitten/theme'
import { ArticleListItem } from '../../article/article-list/article-list-item.component'

const HeadlineListComponent = React.memo(({ articles, onItemPress, touchEnable, themedStyle, refreshing, handleRefresh }) => {
	const _onItemPress = (article) => {
		onItemPress(article)
	}
	const renderItem = (info) => {
		return <ArticleListItem style={themedStyle.item} article={info.item} onPress={() => touchEnable && _onItemPress(info.item)} />
	}

	return (
		<FlatList
			contentContainerStyle={themedStyle.container}
			data={articles}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

export const HeadlineList = withStyles(HeadlineListComponent, (theme) => ({
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
