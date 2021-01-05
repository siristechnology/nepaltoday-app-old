import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text } from 'react-native'
import { withStyles } from '@ui-kitten/components/theme'
import { useScrollToTop } from '@react-navigation/native'

import { ArticleListItem } from './article.component'
import { getReadArticles } from '../../../../services/asyncStorageService'
import { useTheme } from 'react-native-paper'

const ArticleListComponent = React.memo(({ eva, articles, onItemPress, onShowMoreModal, refreshing, handleRefresh, headerComponent }) => {
	const [readArticles, setReadArticles] = useState([])

	useEffect(() => {
		getReadArticles().then((res) => {
			setReadArticles(res)
		})
	}, [])

	const _onItemPress = (article) => {
		onItemPress(article)
	}

	const renderItem = ({ item, index }) => {
		return (
			<Text>Shiva{index}</Text>
			// <ArticleListItem
			// 	index={index}
			// 	isRead={readArticles.filter((x) => x.articleId == item._id).length}
			// 	style={[eva.style.item,{borderBottomColor: theme.colors.lightBackground}]}
			// 	article={item}
			// 	onShowMoreModal={onShowMoreModal}
			// 	onPress={() => _onItemPress(item)}
			// />
		)
	}

	const ref = React.useRef(null)
	useScrollToTop(ref)
	const theme = useTheme()
	return (
		<FlatList
			contentContainerStyle={[eva.style.container,{backgroundColor: theme.colors.background}]}
			data={[{_id:1},{ _id:2}]}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ref={ref}
			ListHeaderComponent={headerComponent}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

export const ArticleList = withStyles(ArticleListComponent, (theme) => ({
	container: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: theme['background-basic-color-1'],
	},
	item: {
		marginVertical: 4,
		backgroundColor: theme['background-basic-color-1'],
		borderBottomWidth: 1,
		// borderBottomColor: '#F5F0F0',
	},
}))
