import React, { useState } from 'react'
import { View, TextInput, RefreshControl, Text, StyleSheet } from 'react-native'
import { FlatList } from 'react-navigation'
import { getRelativeTime } from './../../../helper/time'
import DistrictCard from './districtCard'
import { useQuery } from '@apollo/react-hooks'
import { CircularSpinner } from '../../../components/common'
import gql from 'graphql-tag'
import AppLayout from '../../../frame/app-layout'
import CoronaSummary from './coronaSummary'
import Icon from 'react-native-vector-icons/MaterialIcons'

const DistrictList = () => {
	const [refreshing, setRefreshing] = useState(false)

	const [searchText, setSearchText] = useState('')

	const handleRefresh = () => {
		setRefreshing(true)
		refetch()
			.then(() => setRefreshing(false))
			.catch((err) => console.log('refetch error', err))
	}

	const { loading, data, refetch, error } = useQuery(GET_DISTRICT_CORONA_STATS, {
		variables: {},
	})

	if (error) {
		console.log('Error here', error)
	}

	const lastUpdated = data && data.getDistrictCoronaStats && getRelativeTime(data.getDistrictCoronaStats.createdDate)

	const renderItem = ({ item, index }) => {
		return <DistrictCard key={index} stat={item} />
	}

	if (loading) {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	} else if (error) {
		return <AppLayout />
	}

	const originalData = (data && data.getDistrictCoronaStats && data.getDistrictCoronaStats.districts) || []
	const filteredData = originalData.filter((x) => x.name.toLowerCase().includes(searchText.toLowerCase()) || x.nepaliName.includes(searchText))
	const sortedData = filteredData.sort((a, b) => (a.totalCases > b.totalCases ? -1 : b.totalCases > a.totalCases ? 1 : 0))
	return (
		<AppLayout>
			<FlatList
				keyboardShouldPersistTaps="handled"
				ListHeaderComponent={
					<>
						<Text style={styles.sourceText}>
							Source: {data && data.getDistrictCoronaStats && data.getDistrictCoronaStats.source}
						</Text>
						<Text style={styles.text}>अन्तिम अपडेट गरिएको : {lastUpdated}</Text>
						<CoronaSummary stats={data && data.getDistrictCoronaStats && data.getDistrictCoronaStats.timeLine} />
						<View style={styles.textInputView}>
							<Icon style={{ flex: 0.09 }} name="search" size={20} />
							<TextInput
								value={searchText}
								placeholder="Search by district"
								style={{ flex: (searchText && 0.82) || 0.91, padding: 4, fontSize: 15 }}
								onChangeText={(text) => setSearchText(text)}
							/>
							{(searchText && (
								<Icon style={{ flex: 0.09, zIndex: 111 }} name="close" size={20} onPress={() => setSearchText('')} />
							)) || <View />}
						</View>
					</>
				}
				data={sortedData}
				renderItem={renderItem}
				keyExtractor={(item) => item.name}
				contentContainerStyle={styles.container}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
				ListFooterComponent={
					<Text style={styles.sourceText}>
						{data && data.getDistrictCoronaStats && data.getDistrictCoronaStats.source}
					</Text>
				}
			/>
		</AppLayout>
	)
}

const GET_DISTRICT_CORONA_STATS = gql`
	query coronaScreenQuery {
		getDistrictCoronaStats {
			createdDate
			timeLine {
				date
				totalCases
				newCases
				totalRecoveries
				newRecoveries
				totalDeaths
				newDeaths
			}
			districts {
				name
				nepaliName
				totalCases
				activeCases
				recovered
				deaths
			}
			source
		}
	}
`

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FAFAFA',
	},
	text: {
		padding: 5,
		paddingTop: 10,
		paddingHorizontal: 15,
	},
	sourceText: {
		alignSelf: 'center',
		marginRight: 10,
		marginBottom: 5,
		fontSize: 13,
	},
	listContainer: {
		padding: 8,
		paddingBottom: 72,
	},
	textInputView: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
		margin: 10,
		elevation: 1,
		padding: 5,
		paddingHorizontal: 7,
	},
})

export default DistrictList
