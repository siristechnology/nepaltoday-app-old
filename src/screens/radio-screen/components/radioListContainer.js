import React from 'react'
import { ScrollView } from 'react-native'
import RadioCard from './radioCard'
import { useScrollToTop } from '@react-navigation/native'

const RadioListContainer = (props) => {
	
	const ref = React.useRef(null)
	useScrollToTop(ref)

	const checkFavorite = (fm) => {
		if(props.favoriteList.filter(x=> x.id == fm.id).length > 0){
			return true
		}else{
			return false
		}
	}

	return (
		<ScrollView ref={ref} style={{ paddingTop: 10}}>
			{props.fmList.map((fm, i) => (
				<RadioCard 
					key={i} 
					isFavorite={checkFavorite(fm)}
					channel={fm} 
					fmList={props.fmList}
					onFMSelect={props.onFMSelect} 
					initSuccess={props.initSuccess}
					currentChannelId={props.currentChannelId} 
					refreshFav={props.refreshFav}
				/>
			))}
		</ScrollView>
	)
}

export default RadioListContainer