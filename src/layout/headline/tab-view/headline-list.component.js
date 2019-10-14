import React from 'react'
import { List } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'
import { ArticleListItem } from '../../article/article-list/article-list-item.component'

const HeadlineListComponent = ({ articles, onItemPress, themedStyle }) => {
	const _onItemPress = article => {
		onItemPress(article)
	}
	const renderItem = info => {
		return (
			<ArticleListItem
				style={themedStyle.item}
				article={info.item}
				onPress={() => _onItemPress(info.item)}
			/>
		)
	}

	return (
		<List
			contentContainerStyle={themedStyle.container}
			data={articles}
			renderItem={renderItem}
			keyExtractor={item => item._id}
		/>
	)
}

export const HeadlineList = withStyles(HeadlineListComponent, theme => ({
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
