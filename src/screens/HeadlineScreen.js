import React from 'react'
import {
	Spinner,
	Header,
	Tabs,
	Tab,
	Container,
	Text,
	ScrollableTab
} from 'native-base'
import { FlatList } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'
import { StyleSheet } from 'react-native'

import environment from '../environment'
import AppLayout from '../frame/AppLayout'
import ArticleCard from '../home/components/article-card'
import { getLocalName } from '../helper/text'

const renderQuery = ({ error, props }) => {
	if (!props) {
		return <Spinner />
	} else if (error) {
		console.log('error:' + JSON.stringify(error))
	}
	const renderTab = () => {
		const tabs = [
			...new Set(props.getArticles.map(article => article.category))
		]

		if (tabs) {
			return tabs.map((tab, idx) => {
				const dataArr = props.getArticles.filter(a => a.category === tab)
				if (dataArr.length <= 0) {
					return <Text>Not available</Text>
				}

				const tabName = getLocalName(tab)

				return (
					<Tab heading={`${tabName}`} key={idx}>
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
						<Header hasTabs style={styles.header} />
						<Tabs renderTabBar={() => <ScrollableTab />}>{renderTab()}</Tabs>
					</Container>
				) : null}
			</AppLayout>
		)
	}
	return <Spinner color="blue" />
}

class HeadlineScreen extends React.PureComponent {
	render() {
		return (
			<QueryRenderer
				environment={environment}
				query={graphql`
					query headlineScreenQuery {
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

const styles = StyleSheet.create({
	header: {
		height: 10
	}
})
