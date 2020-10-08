import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'

const RadioCard = (props) => {
    const {channel, currentChannelId} = props
    return(
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.cardContainer}
            onPress={()=>props.onFMSelect(channel)}
            disabled={!props.initSuccess}
        >
            <Image
                source={{uri: channel.artwork}}
                style={styles.imageStyle}
            />
            <View style={styles.textView}>
                <Text style={[styles.titleText,{fontWeight:currentChannelId==channel.id && 'bold' || '600'}]}>
                    {channel.title}
                </Text>
                <Text style={[styles.artistText,{fontWeight:currentChannelId==channel.id && 'bold' || '600'}]}>
                    {channel.artist}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageStyle: {
        width: 80,
        height: 80
    },
    textView:{
       marginLeft:20 
    },
    titleText: {
       fontSize: 18,
       opacity: 0.9 
    },
    artistText: {
        marginTop:5,
        fontSize:13,
        opacity: 0.7
    }
})

export default RadioCard