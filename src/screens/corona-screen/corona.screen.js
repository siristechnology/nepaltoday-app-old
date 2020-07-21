import { Text, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import CountryList from './coronaCountryStats/countryList'

const CoronaScreen = (props) => {
    const [refreshing, setRefreshing] = useState(false)

    const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
    } 

    const { loading, data, refetch, error } = useQuery(GET_CORONA_STATS, {
		variables: {},
    })

    if(error){
        console.log("Error here",error)
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
                <View style={style.headerStyle}>
					<Text style={style.textStyle}>कोरोना तथ्याङ्क</Text>
				</View>
                <CountryList
                    stats = {data.getLatestCoronaStats}
                    refreshing={refreshing} 
					handleRefresh={handleRefresh}
                />
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

const style = StyleSheet.create({
    headerStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 26,
        paddingTop: 5,
    }
})
    
export default CoronaScreen