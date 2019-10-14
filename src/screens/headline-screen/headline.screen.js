import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { QueryRenderer, graphql } from 'react-relay'
import { useNetInfo } from '@react-native-community/netinfo'

import { en } from '../../lang/en'
import environment from '../../environment'
import AppLayout from '../../frame/app-layout'
import { getLocalName } from '../../helper/text'
import { HealineListContainer } from '../../layout/headline'
import { TabView, Tab, Text } from 'react-native-ui-kitten/ui'
import { ContainerView, CircularSpinner } from '../../components/common'
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
	const [selectedIndex, setSelectedIndex] = useState(0)

	useEffect(() => {
		setConnected(netInfo.isConnected)
	}, [netInfo.isConnected])

	const onTabSelect = index => {
		setSelectedIndex(index)
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
						<Tab title={localTabName} key={idx}>
							<Text>Not available</Text>
						</Tab>
					)
				}

				return (
					<Tab title={localTabName} key={idx} style={styles.tab}>
						<HealineListContainer
							articles={dataArr}
							navigation={navigation}
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
						<ContainerView>
							<TabView
								selectedIndex={selectedIndex}
								onSelect={onTabSelect}
								shouldLoadComponent={index =>
									index === selectedIndex
								}>
								{renderTab()}
							</TabView>
						</ContainerView>
					) : null}
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

const styles = StyleSheet.create({
	tab: {},
})
