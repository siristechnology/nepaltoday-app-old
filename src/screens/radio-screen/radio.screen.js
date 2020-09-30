import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AppLayout from '../../frame/app-layout'
import TrackPlayer, {
    TrackPlayerEvents,
    STATE_PLAYING,
} from 'react-native-track-player';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';

import RadioListContainer from './components/radioListContainer'

import { fmDetails } from './../../config/fm'
import BottomPlayer from './components/bottomPlayer';

TrackPlayer.registerPlaybackService(() => require('./service.js'));

const trackPlayerInit = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
      ],
    });
    for(let fmDetail of fmDetails){
      await TrackPlayer.add({
        id: fmDetail.id,
        url: fmDetail.url,
        type: 'default',
        title: fmDetail.title,
        album: fmDetail.album,
        artist: fmDetail.artist,
        artwork: fmDetail.artwork,
      });
    }
    return true;
};

const RadioScreen = () => {

    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);

    const [currentChannel, setCurrentChannel] = useState({})

    const onFMSelect = (channel) => {
        setCurrentChannel(channel)
        TrackPlayer.play();
        TrackPlayer.skip(channel.id)
        setIsPlaying(true);
        // TrackPlayer.pause();
        // setIsPlaying(false);
    }

    useEffect(() => {
        const startPlayer = async () => {
          let isInit =  await trackPlayerInit();
          setIsTrackPlayerInit(isInit);
        }
        startPlayer();
    }, []);

    useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
        if (event.state === STATE_PLAYING) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
    });

    return(
        <AppLayout>
            <View style={style.headerStyle}>
                <Text style={style.headerText}>
                    NepalToday FM
                </Text>
            </View>
            <RadioListContainer
                fmList={fmDetails}
                onFMSelect={onFMSelect}
            />
            <BottomPlayer
                isPlaying={isPlaying}
            />
        </AppLayout>
    )
}

const style = StyleSheet.create({
    headerStyle: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    headerText: {
        fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5
    }
})

export default RadioScreen