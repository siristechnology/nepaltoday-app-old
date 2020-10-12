import React, {useEffect} from 'react'
import { View } from 'react-native'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from './../../components/common'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import RadioListContainer from './components/radioListContainer'

const AllRadio = (props) => {

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
            <RadioListContainer
                fmList={fmList}
                onFMSelect={props.onFMSelect}
                initSuccess={props.isTrackPlayerInit}
                // currentChannelId={currentChannelId}
            />
        </AppLayout>
    )

}

export default AllRadio

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