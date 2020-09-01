import React, { useState } from 'react'
import { RefreshControl, View, Text, StyleSheet, Modal } from 'react-native'
import { FlatList } from 'react-navigation'
import TrendingCard from './trendingCard'
import TrendingDetail from './trendingDetail'

const TrendingListContainer = (props) => {

    const [showDetail, setShowDetail] = useState(false)
    const [clickedHandle, setClickedHandle]= useState({})
    
    const onCardClick = (trending) => {
        setClickedHandle(trending)
        setShowDetail(true)
    }

    const closeDetail = () => {
        setShowDetail(false)
    }

    const renderCategory = (info) => {
        return(
            <View style={styles.catCard}>
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>
                        {info.item.category}
                    </Text>
                </View>
                {info.item.counts.map((iItem,i)=>(
                    <View key={i}>
                        <TrendingCard
                            onCardClick={onCardClick}
                            trending={iItem}
                        />
                    </View>
                ))}
            </View>
        )
    }

    const renderList = () => (
        <FlatList
            data={props.trending}
            renderItem={renderCategory}
            keyExtractor={(item,i) => (`${i}`)}
            refreshControl={<RefreshControl
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
            />}
        />
    )

    return(
        <View style={{marginBottom:100}}>
            {renderList()}
            <Modal
                visible={showDetail}
                onRequestClose={closeDetail}
                transparent={false}
                animationType="slide"
            >
                <TrendingDetail
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
        marginVertical: 5
    },
    textStyle: {
        fontSize: 17,
    },
    catCard: {
        backgroundColor:'#FAFAFA',
        margin: 5
    }
})

export default TrendingListContainer