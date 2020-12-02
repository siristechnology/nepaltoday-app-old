import React, { useEffect, useState } from 'react'
import { RefreshControl, FlatList } from 'react-native'
import { withStyles } from '@ui-kitten/components/theme'
import { useScrollToTop } from '@react-navigation/native'
import { ArticleListItem } from '../../article/article-list/article-list-item.component'
import { getReadArticles } from '../../../services/asyncStorageService'
import { useTheme } from 'react-native-paper'

const HeadlineListComponent = React.memo(({ eva, articles, onItemPress, refreshing, handleRefresh }) => {
	
	const [readArticles, setReadArticles] = useState([])

	const theme = useTheme()

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
			style={eva.style.item} 
			article={item} 
			onPress={() => _onItemPress(item)} 
		/>
	}

	const ref = React.useRef(null)
	useScrollToTop(ref)

	return (
		<FlatList
			contentContainerStyle={[eva.style.container,{backgroundColor: theme.colors.lightBackground}]}
			data={articles}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ref={ref}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

export const HeadlineList = withStyles(HeadlineListComponent, (theme) => ({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
