import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { withStyles } from '@ui-kitten/components/theme'
import { useScrollToTop } from '@react-navigation/native'

import { ArticleListItem } from './article-list-item.component'
import { useTheme } from 'react-native-paper'

const ArticleListComponent = React.memo(({ eva, articles, onItemPress, refreshing, handleRefresh }) => {
	const _onItemPress = (article) => {
		onItemPress(article)
	}
	const renderItem = (info) => {
		return <ArticleListItem style={eva.style.item} article={info.item} onPress={() => _onItemPress(info.item)} />
	}

	const theme = useTheme()

	const ref = React.useRef(null)
	useScrollToTop(ref)

	return (
		<FlatList
			contentContainerStyle={[eva.style.container,{backgroundColor: theme.colors.lightBackground}, articles.length == 0 && { paddingVertical: 0 }]}
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
		// backgroundColor: theme['background-basic-color-4'],
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
