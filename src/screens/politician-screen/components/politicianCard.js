import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PoliticianCard = (props) => {
    
    return(
        <View style={styles.container}>
            <Text style={styles.nameText}>
                {props.politician.name}
            </Text>
            <Text style={styles.handleText}>
                {props.politician.handle}
            </Text>
        </View>
    )

}

export default PoliticianCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 12,
        margin: 5,
        backgroundColor:'#fff',
        elevation: 0.9,
        marginHorizontal:10
    },
    nameText: {
        fontSize: 17,
        opacity: 0.9,
        fontWeight: '700'
    },
    handleText: {
        fontSize: 14,
        opacity: 0.7
    }
})