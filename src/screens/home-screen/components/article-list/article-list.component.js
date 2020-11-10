import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { withStyles } from 'react-native-ui-kitten/theme'
import { useScrollToTop } from '@react-navigation/native'

import { ArticleListItem } from './article.component'
import { getReadArticles } from '../../../../services/asyncStorageService'

const ArticleListComponent = React.memo(({ articles, onItemPress, themedStyle, refreshing, handleRefresh, headerComponent }) => {
	
	const [readArticles, setReadArticles] = useState([])

	useEffect(() => {
		getReadArticles().then(res=>{
			setReadArticles(res)
		})		
	},[])
	
	const _onItemPress = (article) => {
		onItemPress(article)
	}

	const renderItem = ({ item, index }) => {
		return <ArticleListItem 
			index={index}
			isRead={readArticles.filter(x=>x.articleId==item._id).length}
			style={themedStyle.item} 
			article={item} 
			onPress={() => _onItemPress(item)} 
		/>
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
		borderBottomColor: '#F5F0F0',
	},
}))
