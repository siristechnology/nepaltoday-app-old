import React from 'react'

import { ArticleList } from './article-list.component'

export const ArticleListContainer = ({ navigation, articles, refreshing, handleRefresh }) => {
	const onItemPress = (article) => {
		navigation.navigate('ArticleDetail', { article, articles })
	}

	return <ArticleList articles={articles} onItemPress={onItemPress} refreshing={refreshing} handleRefresh={handleRefresh} />
}
