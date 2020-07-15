import React from 'react'
import { HeadlineList } from './headline-list.component'

export const HealineListContainer = ({
	navigation,
	articles,
	refreshing,
	handleRefresh,
	touchEnable
}) => {
	const onItemPress = article => {
		navigation.navigate('ArticleDetail', { article,articles })
	}

	return (
		<HeadlineList
			touchEnable={touchEnable}
			articles={articles}
			onItemPress={onItemPress}
			refreshing={refreshing}
			handleRefresh={handleRefresh}
		/>
	)
}
