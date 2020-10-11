import React from 'react'
import { CircularSpinner } from '../../../../components/common'

import { ArticleList } from './article-list.component'

export const ArticleListContainer = (props) => {
	const { articles, navigation } = props

	const onItemPress = (article) => {
		navigation.navigate('ArticleDetail', { article, articles })
	}

	return ((!articles || articles.length === 0) && <CircularSpinner />) || <ArticleList onItemPress={onItemPress} {...props} />
}
