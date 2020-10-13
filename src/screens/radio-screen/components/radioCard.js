import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import RadioService from './../radio.services'
import auth from '@react-native-firebase/auth'

const RadioCard = (props) => {

    const onIconPress = (isFav, channel) => {
        const nid = auth().currentUser.uid
        if(isFav){
            RadioService.deleteFavorite(nid, channel.id).then(()=>props.refreshFav())
        }else{
            RadioService.saveFavorite(nid, channel.id).then(()=>props.refreshFav())
        }
    } 

    const {channel, currentChannelId, fmList, isFavorite} = props
    return(
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.cardContainer}
            onPress={()=>props.onFMSelect(channel, fmList)}
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
            <FAIcon
                name={isFavorite && "heart" || "heart-o"}
                color="#f44336"
                size={23}
                style={{position:'absolute',right:10}}
                onPress={()=>onIconPress(isFavorite, channel)}
            />
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
       marginLeft:12
    },
    titleText: {
       fontSize: 17,
       opacity: 0.9 
    },
    artistText: {
        marginTop:5,
        fontSize:13,
        opacity: 0.7
    }
})

export default RadioCard