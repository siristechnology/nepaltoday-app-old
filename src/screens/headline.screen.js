import React from 'react'
import { FlatList } from 'native-base'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../environment'
import AppLayout from '../frame/AppLayout'
import ArticleCard from '../home/components/article-card'

export const HeadlineScreen = ({ actions, navigation }) => {
	return (
		<QueryRenderer
			environment={environment}
			query={graphql`
        query headlineQuery {
          getArticles {
            _id
            title
            shortDescription
            content
            link
            imageLink
            publishedDate
            modifiedDate
            category
            source {
              _id
              name
              logoLink
            }
          }
        }
      `}
			render={({ error, props }) => {
				console.log('props here in headline page', props)
				if (!props) {
					console.log('data not found')
				} else if (error) {
					console.log('error:' + JSON.stringify(error))
				}

				return (
					<AppLayout>
						{props && props.getArticles && (
							<FlatList
								data={props.getArticles}
								keyExtractor={item => item._id}
								renderItem={({ item }) => {
									return (
										<ArticleCard
											article={item}
											key={item._id}
											actions={actions}
											navigation={navigation}
										/>
									)
								}}
							/>
						)}
					</AppLayout>
				)
			}}
		/>
	)
}
