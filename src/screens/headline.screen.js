import React from 'react'
import { Spinner } from 'native-base'
import { FlatList } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../environment'
import AppLayout from '../frame/AppLayout'
import ArticleCard from '../home/components/article-card'
class HeadlineScreen extends React.PureComponent {
	render () {
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
						return <Spinner color="blue" />
					} else if (error) {
						console.log('error:' + JSON.stringify(error))
					}

					return (
						<AppLayout>
							{props && props.getArticles.length > 0 && (
								<FlatList
									data={props.getArticles}
									keyExtractor={item => item._id}
									extraData={this.state}
									renderItem={({ item }) => {
										return (
											<ArticleCard
												article={item}
												key={item._id}
												actions={this.props.actions}
												navigation={this.props.navigation}
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
}

export default HeadlineScreen
