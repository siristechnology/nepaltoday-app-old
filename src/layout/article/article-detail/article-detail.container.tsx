import React from 'react'
import { ArticleDetail } from './article-detail.component'

interface State {
	article
}

export default class ArticleDetailContainer extends React.PureComponent<any, State> {
	public render(): React.ReactNode {
		const {
			navigation: {
				state: {
					params: { article },
				},
			},
		} = this.props

		return <ArticleDetail article={article} navigation={this.props.navigation} />
	}
}
