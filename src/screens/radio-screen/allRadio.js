import React, {useState} from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import AppLayout from '../../frame/app-layout'
import RadioListContainer from './components/allRadioListContainer'
import Icon from 'react-native-vector-icons/MaterialIcons'

const AllRadio = (props) => {
  const [searchText, setSearchText] = useState('')

  let toShowList = []
  if(searchText){
    toShowList = props.allFm && props.allFm.filter(x=> x.title.toLowerCase().includes(searchText.toLowerCase()) || x.province.toLowerCase().includes(searchText.toLowerCase())) || []
  }else{
    toShowList = props.allFm
  }

  return(
    <AppLayout>
      <View style={styles.textInputView}>
        <Icon style={{ flex: 0.09 }} name="search" size={20} />
        <TextInput
          value={searchText}
          placeholder="Search fm"
          style={{ flex: (searchText && 0.82) || 0.91, padding: 4, fontSize: 15 }}
          onChangeText={(text) => setSearchText(text)}
        />
        {(searchText && (
          <Icon style={{ flex: 0.09, zIndex: 111 }} name="close" size={20} onPress={() => setSearchText('')} />
        )) || <View />}
      </View>
      <RadioListContainer
        searchText={searchText}
        fmList={toShowList}
        favoriteList={props.favoriteList}
        onFMSelect={props.onFMSelect}
        initSuccess={props.initSuccess}
        currentChannelId={props.currentChannelId}
        refreshFav={props.refetchFavorite}
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

export default AllRadio