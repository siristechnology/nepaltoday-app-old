import React from 'react'
import { CircularSpinner } from '../../../components/common'

import { ArticleList } from './article-list.component'

export const ArticleListContainer = ({ navigation, articles, refreshing, handleRefresh }) => {
	const onItemPress = (article) => {
		navigation.navigate('ArticleDetail', { article, articles })
	}

	return (
		((!articles || articles.length === 0) && <CircularSpinner />) || (
			<ArticleList articles={articles} onItemPress={onItemPress} refreshing={refreshing} handleRefresh={handleRefresh} />
		)
	)
}
