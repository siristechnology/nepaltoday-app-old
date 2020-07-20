import React from 'react'
import { View, RefreshControl, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-navigation'
import { getRelativeTime } from './../../../helper/time'
import CountryCard from './countryCard'

const CountryList = (props) => {

    const lastUpdated = getRelativeTime(props.stats.createdDate)

    const renderItem = (info) => {
        return <CountryCard
            stat={info.item}
        />
    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                अन्तिम अपडेट गरिएको : {lastUpdated}
            </Text>
            <FlatList
                contentContainerStyle={styles.listContainer}
                keyExtractor={(item) => item.country}
                data={props.stats.stats}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl 
                        refreshing={props.refreshing} 
                        onRefresh={props.handleRefresh} 
                        colors={['#0000ff', '#689F38']} 
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FAFAFA'
    },
    text: {
        padding: 5,
        paddingTop: 10,
        paddingHorizontal:15
    },
    listContainer: {
        padding: 8,
        paddingBottom:175
    }
})

export default CountryList