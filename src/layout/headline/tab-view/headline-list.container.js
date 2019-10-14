import React from 'react'
import { HeadlineList } from './headline-list.component'

export const HealineListContainer = ({ navigation, articles }) => {
	const onItemPress = article => {
		navigation.navigate('ArticleDetail', { article })
	}

	return <HeadlineList articles={articles} onItemPress={onItemPress} />
}
