import React, {useEffect, useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from './../../components/common'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import RadioListContainer from './components/radioListContainer'
import TrackPlayer from 'react-native-track-player'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/MaterialIcons'

const FavoriteRadio = (props) => {

    const [searchText, setSearchText] = useState('')

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

    const { data, loading, error } = useQuery(GET_FAVOURITE_FM_QUERY, {
        variables: {},
    })      

    const fmList = data && data.getMyFavoriteFm || []

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
          })
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
            <View style={styles.textInputView}>
				<Icon style={{ flex: 0.09 }} name="search" size={20} />
				<TextInput
					value={searchText}
					placeholder="Search favorites"
					style={{ flex: (searchText && 0.82) || 0.91, padding: 4, fontSize: 15 }}
					onChangeText={(text) => setSearchText(text)}
				/>
				{(searchText && (
					<Icon style={{ flex: 0.09, zIndex: 111 }} name="close" size={20} onPress={() => setSearchText('')} />
				)) || <View />}
			</View>
            <RadioListContainer
                fmList={fmList}
                onFMSelect={props.onFMSelect}
                initSuccess={props.isTrackPlayerInit}
                // currentChannelId={currentChannelId}
            />
        </AppLayout>
    )
}

const styles = StyleSheet.create({
    textInputView: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
        margin: 10,
        marginBottom: 2,
		elevation: 1,
		padding: 5,
		paddingHorizontal: 7,
	},
})

export default FavoriteRadio