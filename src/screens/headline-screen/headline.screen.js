import { Text } from 'react-native-ui-kitten/ui'
import React, { useState, useEffect } from 'react'
import { en } from '../../lang/en'
import { getLocalName } from '../../helper/text'
import { OfflineNotice } from '../../components'
import { HealineListContainer } from '../../layout/headline'
import { CircularSpinner } from '../../components/common'
import { connect } from 'react-redux'
import types from './../../ducks/types';
import { Container, Tab, Tabs } from 'native-base';

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
					<Tab 
						style={{flex:1}} 
						heading={localTabName} 
						key={idx}
						tabStyle={{backgroundColor:'#fff'}} 
						activeTabStyle={{backgroundColor:'#fff'}} 
						textStyle={{color:'#000'}} 
						activeTextStyle={{color:'#000'}}
					>
						<Text>Not available</Text>
					</Tab>
				)
			}

			return (
				<Tab 
					style={{flex:1}} 
					heading={localTabName} 
					key={idx} 
					tabStyle={{backgroundColor:'#fff'}} 
					activeTabStyle={{backgroundColor:'#fff'}} 
					textStyle={{color:'#000'}} 
					activeTextStyle={{color:'#000'}}
				>
					<OfflineNotice />
					<HealineListContainer
						articles={dataArr}
						navigation={props.navigation}
						refreshing={refreshing}
						handleRefresh={handleRefresh}
					/>
				</Tab>
			)
		})
	}

	return (
		<Container>
			<Tabs tabBarUnderlineStyle={{backgroundColor:'#ff0000'}}>
				{renderTab()}
			</Tabs>
		</Container>
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
