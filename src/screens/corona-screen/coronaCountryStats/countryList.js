import React, { useState } from 'react'
import { View, RefreshControl, TextInput, ScrollView, Text, StyleSheet } from 'react-native'
import { getRelativeTime } from './../../../helper/time'
import CountryCard from './countryCard'
import { useQuery } from '@apollo/react-hooks'
import { CircularSpinner } from '../../../components/common'
import gql from 'graphql-tag'
import AppLayout from '../../../frame/app-layout'
import CoronaSummary from '../coronaDistrictStats/coronaSummary'
import Icon from 'react-native-vector-icons/MaterialIcons'

const CountryList = () => {

    const [refreshing, setRefreshing] = useState(false)

    const [searchText, setSearchText] = useState('')

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

    const renderItem = (info, i) => {
        return <CountryCard
            stat={info}
            key={i}
        />
    }

    if(loading){
        return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
    } else if (error) {
		return (
            <AppLayout>
                
            </AppLayout>
        )
    }
    let originalData = data && data.getLatestCoronaStats && data.getLatestCoronaStats.stats
    let filteredData = originalData.filter(x=>x.country.toLowerCase().includes(searchText.toLowerCase()))
    let sortedData = filteredData.sort((a,b) => (a.total_cases > b.total_cases) ? -1 : ((b.total_cases > a.total_cases) ? 1 : 0));
    return(
        <AppLayout>
            <ScrollView 
                style={styles.container}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={handleRefresh} 
                        colors={['#0000ff', '#689F38']} 
                    />
                }
            >
                <Text style={styles.text}>
                    अन्तिम अपडेट गरिएको : {lastUpdated}
                </Text>
                <CoronaSummary
                    stats={data && data.getLatestCoronaStats && data.getLatestCoronaStats.worldSummary}
                />
                <View style={styles.textInputView}>
                    <Icon
                        style={{flex:0.09}}
                        name="search"
                        size={20}
                    />
                    <TextInput
                        value={searchText}
                        placeholder="Search by country"
                        style={{flex:searchText && 0.82 || 0.91,padding:4,fontSize:15}}
                        onChangeText={(text)=>setSearchText(text)}
                    />
                    {searchText && <Icon
                        style={{flex:0.09, zIndex:111}}
                        name="close"
                        size={20}
                        onPress={()=>setSearchText('')}
                    /> || <View/>}
                </View>
                {sortedData.filter(x=>x.country!='Nepal').map((country,i)=>(
                    renderItem(country,i)
                ))}
            </ScrollView>
        </AppLayout>
    )

}

const GET_CORONA_STATS = gql`
	query coronaScreenQuery {
		getLatestCoronaStats {
            createdDate
            worldSummary{
                totalCases,
                newCases,
                totalDeaths,
                newDeaths
            }
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
    },
    textInputView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        elevation:1,
        padding:5,
        paddingHorizontal:7
    }
})

export default CountryList