import React from 'react'
import { RefreshControl } from 'react-native'
import { FlatList } from 'react-navigation'
import TrendingCard from './trendingCard'

const TrendingListContainer = (props) => {
    
    const renderItem = (info) => {
        return(
            <TrendingCard
                trending={info.item}
            />
        )
    }

    return(
        <FlatList
            data={props.trending}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
            />}
        />
    )
}

export default TrendingListContainer