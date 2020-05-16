import React from 'react'
import { HeadlineList } from './headline-list.component'

export const HealineListContainer = ({
	navigation,
	articles,
	refreshing,
	handleRefresh,
}) => {
	const onItemPress = article => {
		navigation.navigate('ArticleDetail', { article })
	}

	return (
		<HeadlineList
			articles={articles}
			onItemPress={onItemPress}
			refreshing={refreshing}
			handleRefresh={handleRefresh}
		/>
	)
}
