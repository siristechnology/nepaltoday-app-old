import { View } from 'react-native'
import ScrollableTabView, {
	ScrollableTabBar,
} from 'react-native-scrollable-tab-view'
import { Text } from 'react-native-ui-kitten/ui'
import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { en } from '../../lang/en'
import { getLocalName } from '../../helper/text'
import { OfflineNotice } from '../../components'
import { HealineListContainer } from '../../layout/headline'

const { NEWS, ENTERTAINMENT, BUSINESS, OPINION, SOCIAL, SPORTS } = en.menu

const HeadlineScreen = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false);
	const [localArticles, setLocalArticles] = useState([])

	const handleRefresh = () => {
		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}

	const getLocalStoredArticles = () => {
		realm = new Realm({ path: 'ArticleDatabase.realm' })
		let storedArticles = realm.objects('articles')
		setLocalArticles(storedArticles)
	}

	useEffect(()=>{
		getLocalStoredArticles()
	},[])

	const { loading, data, refetch, error } = useQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	const renderTab = () => {
		const tabNames = [
			NEWS,
			ENTERTAINMENT,
			BUSINESS,
			OPINION,
			SOCIAL,
			SPORTS,
		]

		return tabNames.map((tabname, idx) => {
			const localTabName = getLocalName(tabname)

			let myArr = data && data.getArticles && data.getArticles.length && data.getArticles || localArticles;

			const dataArr = myArr.filter(
				a => a.category === tabname,
			)

			if (dataArr.length <= 0) {
				return (
					<View tabLabel={localTabName} key={idx}>
						<Text>Not available</Text>
					</View>
				)
			}

			return (
				<View tabLabel={localTabName} key={idx}>
					<OfflineNotice />
					<HealineListContainer
						articles={dataArr}
						navigation={navigation}
						refreshing={refreshing}
						handleRefresh={handleRefresh}
					/>
				</View>
			)
		})
	}

	return (
		<ScrollableTabView
			locked={true}
			initialPage={0}
			renderTabBar={() => <ScrollableTabBar />}>
			{renderTab()}
		</ScrollableTabView>
	)
}

export const GET_ARTICLES_QUERY = gql`
	query homeScreenQuery {
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
`

export default HeadlineScreen
