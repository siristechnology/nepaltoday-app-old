import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
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

    const formatFmList = (fmList) => {
        const result = fmList.reduce(function (r, a) {
            r[a.province] = r[a.province] || [];
            r[a.province].push(a);
            return r;
        }, Object.create(null));
        return result
    }
    
    const formattedFmList = formatFmList(props.fmList)
	return (
		<ScrollView ref={ref} style={{ paddingTop: 10}}>
			{Object.keys(formattedFmList).map((province, i) => (
				<View key={i} style={styles.provinceView}>
                    <Text style={styles.provinceText}>
                        {province}
                    </Text>
                    {formattedFmList[province].map((fm,j)=>(
                        <RadioCard
                            key={j} 
                            isFavorite={checkFavorite(fm)}
                            channel={fm} 
                            fmList={props.fmList}
                            onFMSelect={props.onFMSelect} 
                            initSuccess={props.initSuccess}
                            currentChannelId={props.currentChannelId} 
                            refreshFav={props.refreshFav}
                        />
                    ))}
                </View>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
    provinceText: {
        fontSize: 16,
        marginLeft: 15,
        marginBottom: 5
    },
    provinceView: {
        borderBottomWidth:1,
        marginVertical:5,
        borderBottomColor:"#F5F5F5",
        paddingBottom:10
    }
})

export default RadioListContainer