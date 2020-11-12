import React, { useState } from 'react'
import { FlatList, RefreshControl, View, Text, StyleSheet, Modal } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import TrendingCard from './trendingCard'
import TrendingDetail from './trendingDetail'

const TrendingListContainer = (props) => {
	const [showDetail, setShowDetail] = useState(false)
	const [clickedHandle, setClickedHandle] = useState({})

	const ref = React.useRef(null)
	useScrollToTop(ref)

	const onCardClick = (trending) => {
		props.navigation.navigate('TrendingDetail',{trending})
	}

	const closeDetail = () => {
		setShowDetail(false)
	}

	const renderCategory = ({item, index}) => {
		return (
			<View testID={"category"+index} style={styles.catCard}>
				<View style={styles.textView}>
					<Text style={styles.textStyle}>{item.category}</Text>
				</View>
				{item.counts.map((iItem, i) => (
					<View testID={"category"+index+""+i} key={i}>
						<TrendingCard onCardClick={onCardClick} trending={iItem} />
					</View>
				))}
			</View>
		)
	}

	const renderList = () => (
		<FlatList
			data={props.trending}
			renderItem={renderCategory}
			keyExtractor={(item, i) => `${i}`}
			ref={ref}
			refreshControl={<RefreshControl onRefresh={props.onRefresh} refreshing={props.refreshing} />}
		/>
	)

	return (
		<View style={{ marginBottom: 3 }}>
			{renderList()}
			<Modal visible={showDetail} onRequestClose={closeDetail} transparent={false} animationType="slide">
				<TrendingDetail 
					navigation={props.navigation}
					trending={clickedHandle} 
					closeDetail={closeDetail} 
				/>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	textView: {
		margin: 5,
		marginVertical: 5,
	},
	textStyle: {
		fontSize: 17,
	},
	catCard: {
		margin: 5,
	},
})

export default TrendingListContainer
