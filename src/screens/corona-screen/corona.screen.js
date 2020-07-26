import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Container, Tab, Tabs } from 'native-base';
import DistrictList from './coronaDistrictStats/districtList';
import CountryList from './coronaCountryStats/countryList';

const CoronaScreen = () => {
    return(
        <Container>
            <View style={style.headerStyle}>
		        <Text style={style.textStyle}>कोरोना तथ्याङ्क</Text>
 			</View>
            <Tabs
                tabBarUnderlineStyle={{backgroundColor:'#ff0000'}} 
            >
                <Tab
                    style={{flex:1}}
                    heading="राष्ट्रिय"
                    tabStyle={{backgroundColor:'#fff'}} 
					activeTabStyle={{backgroundColor:'#fff'}} 
					textStyle={{color:'#000'}} 
					activeTextStyle={{color:'#000'}}
                >
                    <DistrictList/>
                </Tab>
                <Tab
                    style={{flex:1}}
                    heading="अन्तर्राष्ट्रिय"
                    tabStyle={{backgroundColor:'#fff'}} 
					activeTabStyle={{backgroundColor:'#fff'}} 
					textStyle={{color:'#000'}} 
					activeTextStyle={{color:'#000'}}
                >
                    <CountryList/>
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
    }
})

export default CoronaScreen
