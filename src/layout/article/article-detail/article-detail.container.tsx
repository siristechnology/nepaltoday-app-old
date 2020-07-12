import React from 'react'
import { View } from 'react-native'
import { ArticleDetail } from './article-detail.component'
import ViewPager from '@react-native-community/viewpager';

interface State {
	article,
	articles
}

export default class ArticleDetailContainer extends React.PureComponent<any, State> {
	public render(): React.ReactNode {
		let article = this.props.navigation.state.params?.article
		let articles = [] 
		if(this.props.navigation.state.params.articles.getArticles){
			articles = this.props.navigation.state.params?.articles.getArticles || []
		}else{
			articles = this.props.navigation.state.params?.articles || []
		}
		return (
		<ViewPager style={{flex:1}} initialPage={articles.indexOf(article)} pageMargin={5}>
			{articles.map((iArticle,i)=>(
				<View key={i}>
					<ArticleDetail
						article={iArticle}
						navigation={this.props.navigation}
					/>
				</View>
			))}
		</ViewPager>)
	}
}
