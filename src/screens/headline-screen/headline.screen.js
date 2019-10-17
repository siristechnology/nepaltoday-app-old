import { View } from 'react-native'
import ScrollableTabView, {
	ScrollableTabBar,
} from 'react-native-scrollable-tab-view'
import { Text } from 'react-native-ui-kitten/ui'
import React, { useEffect, useState } from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { useNetInfo } from '@react-native-community/netinfo'

import { en } from '../../lang/en'
import environment from '../../environment'
import AppLayout from '../../frame/app-layout'
import { getLocalName } from '../../helper/text'
import { CircularSpinner } from '../../components/common'
import { HealineListContainer } from '../../layout/headline'

const {
	POLITICS,
	NEWS,
	ENTERTAINMENT,
	BUSINESS,
	OPINION,
	SOCIAL,
	SPORTS,
} = en.menu

const HeadlineScreen = ({ navigation }) => {
	const netInfo = useNetInfo()
	const [isConnected, setConnected] = useState(true)

	useEffect(() => {
		setConnected(netInfo.isConnected)
	}, [netInfo.isConnected])

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
						<View tabLabel={localTabName} key={idx}>
							<Text>Not available</Text>
						</View>
					)
				}

				return (
					<View tabLabel={localTabName} key={idx}>
						<HealineListContainer
							articles={dataArr}
							navigation={navigation}
						/>
					</View>
				)
			})
		}

		if (error) {
			return <Text>{error.message}</Text>
		} else if (props) {
			return (
				<AppLayout>
					<ScrollableTabView
						initialPage={0}
						renderTabBar={() => <ScrollableTabBar />}>
						{renderTab()}
					</ScrollableTabView>
				</AppLayout>
			)
		}
		return <CircularSpinner />
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
				isConnected,
			}}
			render={renderQuery}
		/>
	)
}

export default HeadlineScreen
