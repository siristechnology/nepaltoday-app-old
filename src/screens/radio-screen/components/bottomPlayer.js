import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TrackPlayer from 'react-native-track-player';

const BottomPlayer = (props) => {
    return(
        <View style={styles.playerContainer}>
            <Icon
                name="fast-backward"
                size={30}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && TrackPlayer.skipToPrevious()}
            />
            {props.isPlaying && <Icon
                name="pause-circle"
                size={35}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && TrackPlayer.pause()}
            /> || <Icon
                name="play-circle"
                size={35}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && TrackPlayer.play()}
            />}
            <Icon
                name="stop-circle"
                size={35}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && TrackPlayer.stop()}
            />
            <Icon
                name="fast-forward"
                size={30}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && TrackPlayer.skipToNext()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    playerContainer: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        width: '100%',
        bottom: 50,
        alignItems:'center'
    },
    icon: {
        opacity:0.7
    }
})

export default BottomPlayer