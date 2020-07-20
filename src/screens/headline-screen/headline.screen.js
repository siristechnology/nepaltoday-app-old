import { View } from 'react-native'
import ScrollableTabView, {
	ScrollableTabBar,
} from 'react-native-scrollable-tab-view'
import { Text } from 'react-native-ui-kitten/ui'
import React, { useState, useEffect } from 'react'
import { en } from '../../lang/en'
import { getLocalName } from '../../helper/text'
import { OfflineNotice } from '../../components'
import { HealineListContainer } from '../../layout/headline'
import { CircularSpinner } from '../../components/common'
import { connect } from 'react-redux'
import types from './../../ducks/types';

const { NEWS, ENTERTAINMENT, BUSINESS, OPINION, SOCIAL, SPORTS } = en.menu

const HeadlineScreen = (props) => {
	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = () => {
		setRefreshing(true);
		props.getOnlineArticles()
		setRefreshing(false)
	}

	useEffect(()=>{
		props.getArticles()
	},[])

	let data = props.articles.data;

	let dataArticles = data && data.getArticles && data.getArticles || []

	if (!dataArticles.length) {
		return <CircularSpinner />
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

			const dataArr = dataArticles.filter(
				a => a.category === tabname,
			)

			if (dataArr.length <= 0) {
				return (
					<View style={{flex:1}} tabLabel={localTabName} key={idx}>
						<Text>Not available</Text>
					</View>
				)
			}

			return (
				<View style={{flex:1}} tabLabel={localTabName} key={idx}>
					<OfflineNotice />
					<HealineListContainer
						articles={dataArr}
						navigation={props.navigation}
						refreshing={refreshing}
						handleRefresh={handleRefresh}
					/>
				</View>
			)
		})
	}

	return (
		<ScrollableTabView
			style={{flex:1}}
			initialPage={0}
			prerenderingSiblingsNumber={1}
			renderTabBar={() => <ScrollableTabBar />}>
			{renderTab()}
		</ScrollableTabView>
	)
}

function mapStateToProps(state) {
	return { articles: state.homeReducer.articles }
}

const mapDispatchToProps = dispatch => ({
	getArticles: () => dispatch({ type: types.FETCH_FROM_CACHE_START }),
	getOnlineArticles: () => dispatch({type: types.REFRESH_CACHE_START})
})

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineScreen)
