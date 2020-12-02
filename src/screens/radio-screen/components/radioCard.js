import React from 'react'
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import RadioService from './../radio.services'
import auth from '@react-native-firebase/auth'
import { useTheme, Text } from 'react-native-paper'

const RadioCard = (props) => {

    const onIconPress = (isFav, channel) => {
        const nid = auth().currentUser.uid
        if(isFav){
            RadioService.deleteFavorite(nid, channel.id).then(()=>props.refreshFav())
        }else{
            RadioService.saveFavorite(nid, channel.id).then(()=>props.refreshFav())
        }
    } 

    const theme = useTheme()

    const {channel, currentChannelId, fmList, isFavorite} = props
    return(
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.cardContainer,{backgroundColor: theme.colors.primary}]}
            onPress={()=>props.onFMSelect(channel, fmList)}
            disabled={!props.initSuccess}
            testID={props.index && props.index || ''}
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
            <TouchableOpacity 
                style={styles.favButton}
                onPress={()=>onIconPress(isFavorite, channel)}
            >
            <FAIcon
                name={isFavorite && "heart" || "heart-o"}
                color="#f44336"
                size={23}
            />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        elevation: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageStyle: {
        width: 50,
        height: 50
    },
    textView:{
       marginLeft:12
    },
    titleText: {
       fontSize: 15,
       opacity: 0.9 
    },
    artistText: {
        marginTop:5,
        fontSize:12,
        opacity: 0.7
    },
    favButton:{
        position:'absolute',
        right:5,
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default RadioCard