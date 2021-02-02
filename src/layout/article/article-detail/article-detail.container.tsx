import React from 'react'
import { View } from 'react-native'
import { ArticleDetail } from './article-detail.component'
import ViewPager from '@react-native-community/viewpager'
import { saveReadArticles } from '../../../services/asyncStorageService'

interface State {
	article
	articles
	articleIndex
	slicedArticles
}

export default class ArticleDetailContainer extends React.PureComponent<any, State> {

	onPageSelected = (article) => {
		saveReadArticles({timeStamp: Date.now(), articleId: article._id, category: article.category})
	}

	public render(): React.ReactNode {
		const article = this.props.route.params.article
		const articles = this.props.route.params.articles || [article]
		const articleIndex = articles.indexOf(article)
		const slicedArticles = articles.slice((articleIndex - 5 > 0 && articleIndex - 5) || 0, articleIndex + 6)
		return (
			<ViewPager 
				style={{ flex: 1 }} 
				initialPage={slicedArticles.indexOf(article)} 
				pageMargin={5}
				onPageSelected={(e)=>this.onPageSelected(slicedArticles[e.nativeEvent.position])}
			>
				{slicedArticles.map((iArticle, i) => (
					<View key={i}>
						<ArticleDetail index={i} article={iArticle} navigation={this.props.navigation} />
					</View>
				))}
			</ViewPager>
		)
	}
}
