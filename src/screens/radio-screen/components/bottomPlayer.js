import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const BottomPlayer = (props) => {
    const {currentChannel, isPlaying} = props
    return(
        <View style={styles.playerContainer}>
            {currentChannel && currentChannel.artwork && <Image
                source={{uri: currentChannel.artwork}}
                style={styles.imageStyle}
            />}
            <View style={styles.iconContainer}>
                <Icon
                    name="fast-backward"
                    size={30}
                    color="#000"
                    style={styles.icon}
                    onPress={()=>props.initSuccess && props.onSkipPrevious()}
                />
                {isPlaying && <Icon
                    name="pause-circle"
                    size={35}
                    color="#000"
                    style={styles.icon}
                    onPress={()=>props.initSuccess && props.onPause()}
                /> || <Icon
                    name="play-circle"
                    size={35}
                    color="#000"
                    style={styles.icon}
                    onPress={()=>props.initSuccess && props.onPlay()}
                />}
                <Icon
                    name="stop-circle"
                    size={35}
                    color="#000"
                    style={styles.icon}
                    onPress={()=>props.initSuccess && props.onStop()}
                />
                <Icon
                    name="fast-forward"
                    size={30}
                    color="#000"
                    style={styles.icon}
                    onPress={()=>props.initSuccess && props.onSkipNext()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    playerContainer: {
        backgroundColor: '#ECEFF1',
        paddingVertical: 1,
        paddingHorizontal: 20,
        paddingRight: 40,
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        bottom: 50,
        alignItems:'center',
        elevation: 2
    },
    iconContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 15
    },
    imageStyle: {
        width: 60,
        height: 60
    },
    icon: {
        opacity:0.7
    }
})

export default BottomPlayer