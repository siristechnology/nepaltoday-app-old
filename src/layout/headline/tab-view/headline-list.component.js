import React, { useEffect, useState } from 'react'
import { RefreshControl, FlatList, StyleSheet } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import { ArticleListItem } from '../../article/article-list/article-list-item.component'
import { getReadArticles } from '../../../services/asyncStorageService'

const HeadlineList = React.memo(({ articles, onItemPress, themedStyle, refreshing, handleRefresh }) => {
	const [readArticles, setReadArticles] = useState([])

	useEffect(() => {
		getReadArticles().then((res) => {
			setReadArticles(res)
		})
	}, [])

	const _onItemPress = (article) => {
		onItemPress(article)
	}

	const renderItem = (info) => {
		return (
			<ArticleListItem
				isRead={readArticles.includes(info.item._id)}
				style={themedStyle.item}
				article={info.item}
				onPress={() => _onItemPress(info.item)}
			/>
		)
	}

	const ref = React.useRef(null)
	useScrollToTop(ref)

	return (
		<FlatList
			contentContainerStyle={themeStyle.container}
			data={articles}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ref={ref}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

const themeStyle = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		// backgroundColor: theme['background-basic-color-4'],
	},
	item: {
		marginVertical: 8,
		// backgroundColor: theme['background-basic-color-1'],
	},
})

export default HeadlineList
