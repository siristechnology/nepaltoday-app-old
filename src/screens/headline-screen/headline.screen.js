import React from 'react'
import {
	Tab,
	Tabs,
	Text,
	Header,
	Spinner,
	Container,
	ScrollableTab,
} from 'native-base'
import { FlatList, StyleSheet } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'

import { en } from '../../lang/en'
import environment from '../../environment'
import AppLayout from '../../frame/app-layout'
import { ArticleCard } from '../../components'
import { getLocalName } from '../../helper/text'

const {
	POLITICS,
	NEWS,
	ENTERTAINMENT,
	BUSINESS,
	OPINION,
	SOCIAL,
	SPORTS,
} = en.menu

class HeadlineScreen extends React.PureComponent {
	renderQuery = ({ error, props }) => {
		if (!props) {
			return (
				<AppLayout>
					<Spinner />
				</AppLayout>
			)
		} else if (error) {
			console.log('error:' + JSON.stringify(error))
			throw new Error(`Error occured here ${JSON.stringify(error)}`)
		}

		const renderTab = () => {
			const tabNames = [
				NEWS,
				POLITICS,
				ENTERTAINMENT,
				BUSINESS,
				OPINION,
				SOCIAL,
				SPORTS,
			]

			return tabNames.map((tabname, idx) => {
				const localTabName = getLocalName(tabname)

				const dataArr = props.getArticles.filter(
					a => a.category === tabname,
				)

				if (dataArr.length <= 0) {
					return (
						<Tab heading={localTabName} key={idx}>
							<Text>Not available</Text>
						</Tab>
					)
				}

				return (
					<Tab heading={localTabName} key={idx}>
						<FlatList
							data={dataArr}
							keyExtractor={item => item._id}
							renderItem={({ item }) => {
								return (
									<ArticleCard
										article={item}
										key={item._id}
										actions={() => {}}
										navigation={this.props.navigation}
									/>
								)
							}}
						/>
					</Tab>
				)
			})
		}

		if (error) {
			return <Text>{error.message}</Text>
		} else if (props) {
			return (
				<AppLayout>
					{props && props.getArticles.length > 0 ? (
						<Container>
							<Header hasTabs style={styles.header} />
							<Tabs renderTabBar={() => <ScrollableTab />}>
								{renderTab()}
							</Tabs>
						</Container>
					) : null}
				</AppLayout>
			)
		}
		return <Spinner color="blue" />
	}

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
				render={this.renderQuery}
			/>
		)
	}
}

export default HeadlineScreen

const styles = StyleSheet.create({
	header: {
		height: 10,
	},
})
