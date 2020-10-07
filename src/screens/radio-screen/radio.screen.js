import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from './../../components/common'
import TrackPlayer, {
    TrackPlayerEvents,
    STATE_PLAYING,
} from 'react-native-track-player';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';

import RadioListContainer from './components/radioListContainer'

import BottomPlayer from './components/bottomPlayer';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

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
    return true;
};

const RadioScreen = () => {

    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);

    // const [currentChannel, setCurrentChannel] = useState({})

    const onFMSelect = async (channel) => {
        // setCurrentChannel(channel)
        await TrackPlayer.play();
        await TrackPlayer.skip(channel.id)
        setIsPlaying(true);
    }

    useEffect(() => {
      const startPlayer = async () => {
        let isInit =  await trackPlayerInit();
        setIsTrackPlayerInit(isInit);
      }
      startPlayer();
    }, []);

    const { data, loading, error } = useQuery(GET_FM_QUERY, {
      variables: {},
    })

    const fmList = data && data.getFmList || []

    useEffect(() => {
      const addFmList = async () => {
        for(let fmDetail of fmList){
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
      }
      addFmList();
    },[loading])

    useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
        if (event.state === STATE_PLAYING) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
    });

    if (loading) {
      return (
        <AppLayout>
          <CircularSpinner />
        </AppLayout>
      )
    } else if (error) {
      return <AppLayout />
    }
    return(
        <AppLayout>
            <View style={style.headerStyle}>
                <Text style={style.headerText}>
                    NepalToday FM
                </Text>
            </View>
            <RadioListContainer
                fmList={fmList}
                onFMSelect={onFMSelect}
                initSuccess={isTrackPlayerInit}
            />
            <BottomPlayer
                isPlaying={isPlaying}
                initSuccess={isTrackPlayerInit}
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

export const GET_FM_QUERY = gql`
	query fmScreenQuery{
    getFmList {
      id
      title
      url
      artist
      artwork
    }
  }
`

export default RadioScreen