import React from 'react'
import AppLayout from '../../frame/app-layout'
import FavoriteRadioListContainer from './components/favoriteRadioListContainer'

const FavoriteRadio = (props) => {
    return(
        <AppLayout>
          <FavoriteRadioListContainer
            fmList={props.favoriteList}
            favoriteList={props.favoriteList}
            onFMSelect={props.onFMSelect}
            initSuccess={props.initSuccess}
            currentChannelId={props.currentChannelId}
            refreshFav={props.refetchFavorite}
          />
        </AppLayout>
    )
}

export default FavoriteRadio