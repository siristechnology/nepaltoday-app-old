import React, { useState } from 'react'
import { View, RefreshControl, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-navigation'
import { getRelativeTime } from './../../../helper/time'
import CountryCard from './countryCard'
import { useQuery } from '@apollo/react-hooks'
import { CircularSpinner } from '../../../components/common'
import gql from 'graphql-tag'
import AppLayout from '../../../frame/app-layout'

const CountryList = () => {

    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
		setRefreshing(true)
        refetch()
            .then(() => setRefreshing(false))
            .catch(err=>console.log("refetch error",err))
    } 

    const { loading, data, refetch, error } = useQuery(GET_CORONA_STATS, {
		variables: {},
    })

    if(error){
        console.log("Error here",error)
    }

    const lastUpdated = data && data.getLatestCoronaStats && getRelativeTime(data.getLatestCoronaStats.stats.createdDate)

    const renderItem = (info) => {
        return <CountryCard
            stat={info.item}
        />
    }

    if(loading){
        return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
    }else{
        return(
            <AppLayout>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        अन्तिम अपडेट गरिएको : {lastUpdated}
                    </Text>
                    <FlatList
                        contentContainerStyle={styles.listContainer}
                        keyExtractor={(item) => item.country}
                        data={data.getLatestCoronaStats.stats}
                        renderItem={renderItem}
                        refreshControl={
                            <RefreshControl 
                                refreshing={refreshing} 
                                onRefresh={handleRefresh} 
                                colors={['#0000ff', '#689F38']} 
                            />
                        }
                    />
                </View>
            </AppLayout>
        )
    }

}

const GET_CORONA_STATS = gql`
	query coronaScreenQuery {
		getLatestCoronaStats {
            createdDate
            stats {
                country
                total_cases
                total_deaths
                new_cases
                new_deaths
            }
        }
    }`

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
        paddingBottom:72
    }
})

export default CountryList