import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CoronaSummary = (props) => {

    const Card = (title, number) => {
        return(
            <View style={styles.individualCard}>
                <Text style={styles.valueText}>
                    {number}
                </Text>
                <Text style={styles.valueTitle}>
                    {title}
                </Text>
            </View>
        )
    }

    return(
        <View>
            <View style={styles.rowView}>
                {Card("Total Cases",props.stats.totalCases)}
                {Card("New Cases",props.stats.newCases)}
            </View>
            <View style={styles.rowView}>
                {Card("Total Deaths",props.stats.totalDeaths)}
                {Card("New Deaths",props.stats.newDeaths)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 7
    },
    individualCard: {
        backgroundColor: '#fff',
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:5,
        paddingHorizontal:15,
        width:'40%',
        borderRadius: 5
    },
    valueText: {
        fontSize: 18,
        opacity: 0.9
    },
    valueTitle: {
        fontSize: 12,
        opacity:0.8
    }
})

export default CoronaSummary