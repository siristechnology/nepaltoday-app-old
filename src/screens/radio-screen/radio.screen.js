import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from './../../components/common'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Container, Tab, Tabs } from 'native-base'
import auth from '@react-native-firebase/auth'
import TrackPlayer, {
    TrackPlayerEvents,
    STATE_PLAYING,
} from 'react-native-track-player';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import BottomPlayer from './components/bottomPlayer';
import FavoriteRadio from './favoriteRadio'
import AllRadio from './allRadio'

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

    const [currentChannelId, setCurrentChannelId] = useState('')

    const GET_FAVOURITE_FM_QUERY = gql`
        query fmScreenQuery{
          getMyFavoriteFm(nid: "${auth().currentUser.uid}") {
            id
            title
            url
            artist
            artwork
            province
          }
        }
    `

    const onFMSelect = async (channel, fmList) => {
      await TrackPlayer.reset()
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
      await TrackPlayer.play();
      await TrackPlayer.skip(channel.id)
      setCurrentChannelId(channel.id)
      setIsPlaying(true);
    }

    const play = async () => {
      await TrackPlayer.play()
      const currentId = await TrackPlayer.getCurrentTrack()
      setCurrentChannelId(currentId)
    }

    const pause = async () => {
      await TrackPlayer.pause()
    }

    const stop = async () => {
      await TrackPlayer.stop()
      setCurrentChannelId('')
    }

    const skipNext = async () => {
      await TrackPlayer.skipToNext();
      const currentId = await TrackPlayer.getCurrentTrack()
      setCurrentChannelId(currentId)
    }

    const skipPrevious = async () => {
      await TrackPlayer.skipToPrevious();
      const currentId = await TrackPlayer.getCurrentTrack()
      setCurrentChannelId(currentId)
    }

    useEffect(() => {
      TrackPlayer.registerPlaybackService(() => async function() {
        TrackPlayer.addEventListener('remote-play', () => {
          play()
        });
      
        TrackPlayer.addEventListener('remote-pause', () => {
          pause()
        });
      
        TrackPlayer.addEventListener('remote-stop', () => {
          stop()
        });
      
        TrackPlayer.addEventListener('remote-next',() => {
          skipNext()
        })
      
        TrackPlayer.addEventListener('remote-previous',() => {
          skipPrevious()
        })

        TrackPlayer.addEventListener('remote-duck',() => {
          pause()
        })
      })
    },[])

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

    const { data: data1, refetch, loading: loading2, error: error2 } = useQuery(GET_FAVOURITE_FM_QUERY, {
      variables: {},
    }) 
    
    const favoriteList = data1 && data1.getMyFavoriteFm || []

    const fmList = data && data.getFmList || []

    useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
        if (event.state === STATE_PLAYING) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
    });

    if (loading || loading2) {
      return (
        <AppLayout>
          <CircularSpinner />
        </AppLayout>
      )
    } else if (error || error2) {
      return <AppLayout />
    }

    const currentChannel = fmList.filter(x=>x.id==currentChannelId)[0]

    return (
      <Container>
        <View style={style.headerStyle}>
          <Text style={style.headerText}>
            NepalToday FM
          </Text>
        </View>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}>
          <Tab
            style={{ flex: 1, paddingBottom: currentChannelId && 126 || 60 }}
            heading="All FM"
            tabStyle={{ backgroundColor: '#fff' }}
            activeTabStyle={{ backgroundColor: '#fff' }}
            textStyle={{ color: '#000' }}
            activeTextStyle={{ color: '#000' }}
          >
            <AllRadio
              allFm={fmList}
              favoriteList={favoriteList}
              onFMSelect={onFMSelect}
              refetchFavorite={refetch}
              initSuccess={isTrackPlayerInit}
              currentChannelId={currentChannelId}
              isPlaying={isPlaying}
            />
          </Tab>
          <Tab
            style={{ flex: 1, marginBottom: currentChannelId && 67 || 0 }}
            heading="Favorite FM"
            tabStyle={{ backgroundColor: '#fff' }}
            activeTabStyle={{ backgroundColor: '#fff' }}
            textStyle={{ color: '#000' }}
            activeTextStyle={{ color: '#000' }}
          >
            <FavoriteRadio 
              onFMSelect={onFMSelect}
              initSuccess={isTrackPlayerInit}
              allFm={fmList}
              refetchFavorite={refetch}
              favoriteList={favoriteList}
              currentChannelId={currentChannelId}
              isPlaying={isPlaying}
            />
          </Tab>
        </Tabs>
        {currentChannelId && <BottomPlayer
          isPlaying={isPlaying}
          initSuccess={isTrackPlayerInit}
          onSkipPrevious={skipPrevious}
          onPause={pause}
          onPlay={play}
          onStop={stop}
          onSkipNext={skipNext}
          currentChannel={currentChannel}
        /> || <View/>}
      </Container>
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
      province
    }
  }
`

export default RadioScreen