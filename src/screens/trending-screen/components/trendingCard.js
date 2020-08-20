import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const TrendingCard = (props) => {
    return(
        <View style={styles.container}>
            <Image
                source={{uri:props.trending.image}}
                style={styles.imageStyle}
            />
            <View>
                <Text style={styles.nameText}>
                    {props.trending.name}
                </Text>
                <Text style={styles.handleText}>
                    {props.trending.handle}
                </Text>
            </View>
        </View>
    )

}

export default TrendingCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 12,
        margin: 3,
        backgroundColor:'#fff',
        elevation: 0.9,
        marginHorizontal:6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 30,
        marginRight: 20
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