import React from 'react'
import { RefreshControl, View, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-navigation'
import TrendingCard from './trendingCard'

const TrendingListContainer = (props) => {
    
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
                            trending={iItem}
                        />
                    </View>
                ))}
            </View>
        )
    }

    return(
        <FlatList
            style={{marginBottom:50}}
            data={props.trending}
            renderItem={renderCategory}
            keyExtractor={(item) => item._id}
            refreshControl={<RefreshControl
                onRefresh={props.onRefresh}
                refreshing={props.refreshing}
            />}
        />
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