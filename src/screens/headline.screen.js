import React from 'react'
import { Spinner, Header, Tabs, Tab, Container } from 'native-base'
import { FlatList } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'

import environment from '../environment'
import AppLayout from '../frame/AppLayout'
import ArticleCard from '../home/components/article-card'

const renderQuery = ({ error, props }) => {
	const renderTab = () => {
		const tabs = [
			...new Set(props.getArticles.map(article => article.category))
		]
		if (tabs) {
			tabs.map(tab => {
				const dataArr = props.getArticles.filter(a => a.category === tab)
				if (dataArr.length <= 0) {
					return <Text>Not available</Text>
				}

				return (
					<Tabs>
						<Tab heading={`${tab}`}>
							<FlatList
								data={dataArr}
								keyExtractor={item => item._id}
								renderItem={({ item }) => {
									return (
										<ArticleCard
											article={item}
											key={item._id}
											actions={() => {}}
											navigation={{}}
										/>
									)
								}}
							/>
						</Tab>
					</Tabs>
				)
			})
		}
	}
	if (error) {
		return <Text>{error.message}</Text>
	} else if (props) {
		return (
			<AppLayout>
				{props && props.getArticles.length > 0 ? (
					<Container>
						<Header hasTabs />
						{renderTab()}
					</Container>
				) : null}
			</AppLayout>
		)
	}
	return <Spinner color="blue" />
}

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
				render={renderQuery}
			/>
		)
	}
}

export default HeadlineScreen
