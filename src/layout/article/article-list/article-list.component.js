import React from 'react'
import { withStyles } from 'react-native-ui-kitten/theme'
import { List } from 'react-native-ui-kitten/ui'
import { ArticleListItem } from './article-list-item.component'

const ArticleListComponent = ({ articles, onItemPress, themedStyle }) => {
	console.log('artiles on article list component', articles)
	const _onItemPress = article => {
		onItemPress(article)
	}
	const renderItem = info => {
		return (
			<ArticleListItem
				style={themedStyle.item}
				article={info.item}
				onPress={_onItemPress}
			/>
		)
	}
	return (
		<List
			contentContainerStyle={themedStyle.container}
			data={articles}
			renderItem={renderItem}
		/>
	)
}

export const ArticleList = withStyles(ArticleListComponent, theme => ({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: theme['background-basic-color-2'],
	},
	item: {
		marginVertical: 8,
		backgroundColor: theme['background-basic-color-1'],
	},
}))
