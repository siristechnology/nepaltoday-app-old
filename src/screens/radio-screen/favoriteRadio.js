import { View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import FavoriteRadioListContainer from './components/favoriteRadioListContainer'

const FavoriteRadio = (props) => {

  const theme = useTheme()

  return(
    <View style={{flex:1, backgroundColor: theme.colors.primary}}>
      <FavoriteRadioListContainer
        fmList={props.favoriteList}
        favoriteList={props.favoriteList}
        onFMSelect={props.onFMSelect}
        initSuccess={props.initSuccess}
        currentChannelId={props.currentChannelId}
        refreshFav={props.refetchFavorite}
      />
    </View>
  )
}

export default FavoriteRadio