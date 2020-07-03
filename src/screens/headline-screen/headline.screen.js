import { View } from 'react-native'
import ScrollableTabView, {
	ScrollableTabBar,
} from 'react-native-scrollable-tab-view'
import { Text } from 'react-native-ui-kitten/ui'
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { en } from '../../lang/en'
import { getLocalName } from '../../helper/text'
import { OfflineNotice } from '../../components'
import { CircularSpinner } from '../../components/common'
import { HealineListContainer } from '../../layout/headline'

const { NEWS, ENTERTAINMENT, BUSINESS, OPINION, SOCIAL, SPORTS } = en.menu

const HeadlineScreen = ({ navigation }) => {
	const [refreshing, setRefreshing] = useState(false);

	const [touchEnable, setTouchEnable] = useState(true);

	const handleRefresh = () => {
		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}

	const { loading, data, refetch, error } = useQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	if (loading) {
		return <CircularSpinner />
	} else if (error) {
		console.log('error:' + JSON.stringify(error))
		throw new Error(`Error occured here ${JSON.stringify(error)}`)
	}

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

			const dataArr = data.getArticles.filter(
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
						touchEnable={touchEnable}
						articles={dataArr}
						navigation={navigation}
						refreshing={refreshing}
						handleRefresh={handleRefresh}
					/>
				</View>
			)
		})
	}

	const onScroll = (i) => {
		if(i==(Math.floor(i)) || i==(Math.floor(i)-1) || i==(Math.floor(i)+1)){
			setTouchEnable(true)
		}else{
			setTouchEnable(false)
		}
	}

	return (
		<ScrollableTabView
			onScroll={i=>onScroll(i)}
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
