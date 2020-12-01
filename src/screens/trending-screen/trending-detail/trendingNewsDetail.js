import React, { useState } from 'react'
import { View, RefreshControl } from 'react-native'
import { useTheme } from 'react-native-paper'
import { ArticleListContainer } from '../../../layout/article/article-list/article-list-container.component'

const TrendingNewsDetail = (props) => {
    const [refreshing, setRefreshing] = useState(false)
    const {data, refetch} = props
    
	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	const theme = useTheme()

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.lightBackground }}>
			<View refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
				<ArticleListContainer
                    articles={data.getIndividualArticles}
                    navigation={props.navigation}
                    refreshing={refreshing}
                    handleRefresh={handleRefresh}
				/>
			</View>
		</View>
	)
}

export default TrendingNewsDetail
