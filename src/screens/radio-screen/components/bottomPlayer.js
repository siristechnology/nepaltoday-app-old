import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import TrackPlayer from 'react-native-track-player';

const BottomPlayer = (props) => {

    const skipToPrevious = async() => {
        await TrackPlayer.skipToPrevious()
    }

    const pause = async() => {
        await TrackPlayer.pause()
    }

    const play = async() => {
        await TrackPlayer.play()
    }

    const stop = async() => {
        await TrackPlayer.stop()
    }

    const skipToNext = async() => {
        await TrackPlayer.skipToNext()
    }

    return(
        <View style={styles.playerContainer}>
            <Icon
                name="fast-backward"
                size={30}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && skipToPrevious()}
            />
            {props.isPlaying && <Icon
                name="pause-circle"
                size={35}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && pause()}
            /> || <Icon
                name="play-circle"
                size={35}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && play()}
            />}
            <Icon
                name="stop-circle"
                size={35}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && stop()}
            />
            <Icon
                name="fast-forward"
                size={30}
                color="#000"
                style={styles.icon}
                onPress={()=>props.initSuccess && skipToNext()}
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