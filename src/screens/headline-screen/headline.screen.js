import { View } from 'react-native'
import ScrollableTabView, {
	ScrollableTabBar,
} from 'react-native-scrollable-tab-view'
import { Text } from 'react-native-ui-kitten/ui'
import React, { useEffect, useState } from 'react'
import { QueryRenderer, graphql } from 'react-relay'

import { en } from '../../lang/en'
import environment from '../../environment'
import { getLocalName } from '../../helper/text'
import { OfflineNotice } from '../../components'
import { CircularSpinner } from '../../components/common'
import { HealineListContainer } from '../../layout/headline'

const { NEWS, ENTERTAINMENT, BUSINESS, OPINION, SOCIAL, SPORTS } = en.menu

const HeadlineScreen = ({ navigation }) => {
	const [refreshCounter, setRefreshCounter] = useState(0)

	const handleRefresh = () => {
		setRefreshCounter(refreshCounter + 1)
	}

	const renderQuery = ({ error, props }) => {
		if (!props) {
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

				const dataArr = props.getArticles.filter(
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
							handleRefresh={handleRefresh}
						/>
					</View>
				)
			})
		}

		return (
			<ScrollableTabView
				initialPage={0}
				renderTabBar={() => <ScrollableTabBar />}>
				{renderTab()}
			</ScrollableTabView>
		)
	}
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
			variables={{
				refreshCounter,
			}}
			render={renderQuery}
		/>
	)
}

export default HeadlineScreen
