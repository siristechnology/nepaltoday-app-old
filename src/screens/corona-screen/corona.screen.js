import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Tab, Tabs } from 'native-base'
import DistrictList from './coronaDistrictStats/districtList'
import CountryList from './coronaCountryStats/countryList'
import { useTheme, Text } from 'react-native-paper'

const CoronaScreen = () => {

	const theme = useTheme()

	return (
		<Container>
			<View style={[style.headerStyle,{backgroundColor: theme.colors.background}]}>
				<Text style={style.textStyle}>कोरोना तथ्याङ्क</Text>
			</View>
			<Tabs tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}>
				<Tab
					style={{ flex: 1 }}
					heading="राष्ट्रिय"
					tabStyle={{ backgroundColor: theme.colors.lightBackground }}
					activeTabStyle={{ backgroundColor: theme.colors.lightBackground }}
					textStyle={{ color: theme.colors.text }}
					activeTextStyle={{ color: theme.colors.text }}
				>
					<DistrictList />
				</Tab>
				<Tab
					testID="internationalCorona"
					style={{ flex: 1 }}
					heading="अन्तर्राष्ट्रिय"
					tabStyle={{ backgroundColor: theme.colors.lightBackground }}
					activeTabStyle={{ backgroundColor: theme.colors.lightBackground }}
					textStyle={{ color: theme.colors.text }}
					activeTextStyle={{ color: theme.colors.text }}
				>
					<CountryList />
				</Tab>
			</Tabs>
		</Container>
	)
}

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
	},
})

export default CoronaScreen
