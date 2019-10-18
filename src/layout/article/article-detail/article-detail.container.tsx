import React from 'react'
import { ArticleDetail } from './article-detail.component'

interface State {
	article
}

export default class ArticleDetailContainer extends React.Component<
	any,
	State
> {
	private onCommentPress = () => {}

	private onLikePress = () => {}

	public render(): React.ReactNode {
		const {
			navigation: {
				state: {
					params: { article },
				},
			},
		} = this.props

		return (
			<ArticleDetail
				article={article}
				onCommentPress={this.onCommentPress}
				onLikePress={this.onLikePress}
				navigation={this.props.navigation}
			/>
		)
	}
}
