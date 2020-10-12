import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from './../../components/common'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Container, Tab, Tabs } from 'native-base'

import TrackPlayer, {
    TrackPlayerEvents,
    STATE_PLAYING,
} from 'react-native-track-player';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';

import RadioListContainer from './components/radioListContainer'
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

    const [currentChannelId, setCurrentChannelId] = useState({})

    const onFMSelect = async (channel) => {
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
      })
    },[])

    useEffect(() => {
      const startPlayer = async () => {
        let isInit =  await trackPlayerInit();
        setIsTrackPlayerInit(isInit);
      }
      startPlayer();
    }, []);

    // const { data, loading, error } = useQuery(GET_FM_QUERY, {
    //   variables: {},
    // })

    // const fmList = data && data.getFmList || []

    // useEffect(() => {
    //   const addFmList = async () => {
    //     for(let fmDetail of fmList){
    //       await TrackPlayer.add({
    //         id: fmDetail.id,
    //         url: fmDetail.url,
    //         type: 'default',
    //         title: fmDetail.title,
    //         album: fmDetail.album,
    //         artist: fmDetail.artist,
    //         artwork: fmDetail.artwork,
    //       });
    //     }
    //   }
    //   addFmList();
    // },[loading])

    useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
        if (event.state === STATE_PLAYING) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
    });

    return (
      <Container>
        <View style={style.headerStyle}>
          <Text style={style.headerText}>
            NepalToday FM
          </Text>
        </View>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}>
          <Tab
            style={{ flex: 1 }}
            heading="Favorite FM"
            tabStyle={{ backgroundColor: '#fff' }}
            activeTabStyle={{ backgroundColor: '#fff' }}
            textStyle={{ color: '#000' }}
            activeTextStyle={{ color: '#000' }}
          >
            <FavoriteRadio 
              onFMSelect={onFMSelect}
              initSuccess={isTrackPlayerInit}
            />
          </Tab>
          <Tab
            style={{ flex: 1 }}
            heading="All FM"
            tabStyle={{ backgroundColor: '#fff' }}
            activeTabStyle={{ backgroundColor: '#fff' }}
            textStyle={{ color: '#000' }}
            activeTextStyle={{ color: '#000' }}
          >
            <AllRadio />
          </Tab>
        </Tabs>
      </Container>
    )

    // if (loading) {
    //   return (
    //     <AppLayout>
    //       <CircularSpinner />
    //     </AppLayout>
    //   )
    // } else if (error) {
    //   return <AppLayout />
    // }
    // const currentChannel = fmList.filter(x=>x.id==currentChannelId)[0]
    // return(
    //     <AppLayout>
    //         <View style={style.headerStyle}>
    //             <Text style={style.headerText}>
    //                 NepalToday FM
    //             </Text>
    //         </View>
    //         <RadioListContainer
    //             fmList={fmList}
    //             onFMSelect={onFMSelect}
    //             initSuccess={isTrackPlayerInit}
    //             currentChannelId={currentChannelId}
    //         /> 
    //         <BottomPlayer
    //             isPlaying={isPlaying}
    //             initSuccess={isTrackPlayerInit}
    //             onSkipPrevious={skipPrevious}
    //             onPause={pause}
    //             onPlay={play}
    //             onStop={stop}
    //             onSkipNext={skipNext}
    //             currentChannel={currentChannel}
    //         />
    //     </AppLayout>
    // )
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

// export const GET_FM_QUERY = gql`
// 	query fmScreenQuery{
//     getFmList {
//       id
//       title
//       url
//       artist
//       artwork
//     }
//   }
// `

export default RadioScreen