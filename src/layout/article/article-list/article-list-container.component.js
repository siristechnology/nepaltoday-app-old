import React from 'react'

import { ArticleList } from './article-list.component'

export const ArticleListContainer = ({ navigation, articles }) => {
	const onItemPress = article => {
		navigation.navigate('ArticleDetail', { article })
	}

	return <ArticleList articles={articles} onItemPress={onItemPress} />
}
