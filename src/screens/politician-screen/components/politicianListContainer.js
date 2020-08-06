import React from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import { FlatList } from 'react-navigation'
import PoliticianCard from './politicianCard'

const PoliticianListContainer = (props) => {
    
    const renderItem = (info) => {
        return(
            <PoliticianCard
                politician={info.item}
            />
        )
    }

    return(
        <FlatList
            data={props.politicians}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
            />}
        />
    )
}

export default PoliticianListContainer

// const styles = StyleShee