import React from 'react'
import { HeadlineList } from './headline-list.component'

export const HealineListContainer = ({
	navigation,
	articles,
	handleRefresh,
}) => {
	const onItemPress = article => {
		navigation.navigate('ArticleDetail', { article })
	}

	return (
		<HeadlineList
			articles={articles}
			onItemPress={onItemPress}
			handleRefresh={handleRefresh}
		/>
	)
}
