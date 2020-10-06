import { Text } from 'react-native-ui-kitten/ui'
import React, { useState, useEffect } from 'react'
import { en } from '../../lang/en'
import { getLocalName } from '../../helper/text'
import { OfflineNotice } from '../../components'
import { HealineListContainer } from '../../layout/headline'
import { CircularSpinner } from '../../components/common'
import { fetchfromAsync, storetoAsync } from '../../helper/cacheStorage'
import { Container, Tab, Tabs, ScrollableTab } from 'native-base'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import crashlytics from '@react-native-firebase/crashlytics'

const { NEWS, ENTERTAINMENT, BUSINESS, SOCIAL, SPORTS, HEALTH, TECHNOLOGY, AGRICULTURE, SHARE, CARTOON } = en.menu

const HeadlineScreen = (props) => {
	const [refreshing, setRefreshing] = useState(false)
	const [articles, setArticles] = useState([])

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then((res) => {
			storetoAsync(res.data.getArticles)
			setArticles(res.data.getArticles)
			setRefreshing(false)
		})
	}

	useEffect(() => {
		fetchfromAsync()
			.then((res) => {
				setArticles(res)
			})
			.catch((err) => {
				crashlytics().recordError(err)
				setArticles([])
			})
	}, [])

	const { refetch } = useQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	if (!articles.length) {
		return <CircularSpinner />
	}

	const renderTab = () => {
		const tabNames = [NEWS, ENTERTAINMENT, BUSINESS, SHARE, SOCIAL, HEALTH, TECHNOLOGY, AGRICULTURE, SPORTS, CARTOON]

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
					style={{ flex: 1 }}
					heading={localTabName}
					key={idx}
					tabStyle={{ backgroundColor: '#fff' }}
					activeTabStyle={{ backgroundColor: '#fff' }}
					textStyle={{ color: '#000' }}
					activeTextStyle={{ color: '#000' }}
				>
					<OfflineNotice />
					<HealineListContainer articles={dataArr} navigation={props.navigation} refreshing={refreshing} handleRefresh={handleRefresh} />
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
				{renderTab()}
			</Tabs>
		</Container>
	)
}

export default HeadlineScreen

const GET_ARTICLES_QUERY = gql`
	query homeScreenQuery {
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
			source {
				name
				logoLink
			}
		}
	}
`
