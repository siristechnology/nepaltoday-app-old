import React from 'react'
import AppLayout from '../../frame/app-layout'
import RadioListContainer from './components/radioListContainer'

const AllRadio = (props) => {
    return(
        <AppLayout>
          <RadioListContainer
            fmList={props.allFm}
            favoriteList={props.favoriteList}
            onFMSelect={props.onFMSelect}
            initSuccess={props.initSuccess}
            currentChannelId={props.currentChannelId}
            refreshFav={props.refetchFavorite}
          />
        </AppLayout>
    )

}

export default AllRadio