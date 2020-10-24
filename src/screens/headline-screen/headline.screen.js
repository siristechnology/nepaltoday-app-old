import { Text } from 'react-native-ui-kitten/ui'
import React, { useState, useEffect } from 'react'
import { en } from '../../lang/en'
import { getLocalName } from '../../helper/text'
import { OfflineNotice } from '../../components'
import { HealineListContainer } from '../../layout/headline'
import { CircularSpinner } from '../../components/common'
import { Container, Tab, Tabs, ScrollableTab } from 'native-base'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'
import crashlytics from '@react-native-firebase/crashlytics'

const { NEWS, ENTERTAINMENT, BUSINESS, SOCIAL, SPORTS, HEALTH, TECHNOLOGY, AGRICULTURE, SHARE, CARTOON } = en.menu

const HeadlineScreen = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false)
	const [fetchNews, { loading, data, refetch, error }] = useLazyQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	useEffect(() => {
		fetchNews()
	}, [fetchNews])

	if (error) {
		crashlytics().recordError(new Error(error))
	}

	if (loading || data == null) {
		return <CircularSpinner />
	}

	const sortedArticles = data.getArticles.sort((a, b) => b.createdDate - a.createdDate)

	const CategoryTabs = ({ articles, navigation }) => {
		const tabNames = [NEWS, ENTERTAINMENT, SPORTS, CARTOON, BUSINESS, SOCIAL, HEALTH, TECHNOLOGY, SHARE, AGRICULTURE]

		return tabNames.map((tabname, idx) => {
			const localTabName = getLocalName(tabname)

			const dataArr = articles.filter((a) => a.category === tabname)

			if (dataArr.length <= 0) {
				return (
					<Tab
						style={{ flex: 1 }}
						heading={localTabName}
						key={idx}
						tabStyle={{ backgroundColor: '#fff' }}
						activeTabStyle={{ backgroundColor: '#fff' }}
						textStyle={{ color: '#000' }}
						activeTextStyle={{ color: '#000' }}
					>
						<Text>Not available</Text>
					</Tab>
				)
			}

			return (
				<Tab
					// testID={"category"+idx}
					style={{ flex: 1 }}
					heading={localTabName}
					key={idx}
					tabStyle={{ backgroundColor: '#fff' }}
					activeTabStyle={{ backgroundColor: '#fff' }}
					textStyle={{ color: '#000' }}
					activeTextStyle={{ color: '#000' }}
				>
					<OfflineNotice />
					<HealineListContainer articles={dataArr} refreshing={refreshing} handleRefresh={handleRefresh} navigation={navigation} />
				</Tab>
			)
		})
	}

	return (
		<Container>
			<Tabs
				tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}
				renderTabBar={() => <ScrollableTab tabsContainerStyle={{ backgroundColor: '#fff' }} />}
			>
				{CategoryTabs({ articles: sortedArticles, navigation })}
				{/* <CategoryTabs articles={data.getArticles} navigation={navigation} /> */}
			</Tabs>
		</Container>
	)
}

export default HeadlineScreen

const GET_ARTICLES_QUERY = gql`
	query headlineScreenQuery {
		getArticles {
			_id
			title
			shortDescription
			content
			link
			imageLink
			createdDate
			modifiedDate
			category
			tags
			totalWeight
			source {
				name
				logoLink
			}
		}
	}
`
