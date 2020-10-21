import React, { useState } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import RadioCard from './radioCard'
import { useScrollToTop } from '@react-navigation/native'
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome5'

const RadioListContainer = (props) => {

    const [activeSections, setActiveSections] = useState([])
	
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
    
    const formatSections = () => {
        let sections = []
        Object.keys(formattedFmList).forEach(province=>{
            const sectionObj = {
                title: province,
                content: formattedFmList[province]
            }
            sections.push(sectionObj)
        })
        return sections
    }

    const sections = formatSections()

    const renderHeader = section => {
        let index = sections.indexOf(section)
        return (
            <View style={styles.provinceView} testID={"header"+index}>
                <Text style={styles.provinceText}>{section.title}</Text>
                {activeSections[0]==sections.indexOf(section) && (
                    <Icon
                        name="chevron-up"
                        size={15}
                    />
                ) || <Icon
                    name="chevron-down"
                    size={15}
                />}
            </View>
        );
    }

    const renderContent = section => {
        let index = sections.indexOf(section)
        return (
            section.content.map((fm,j)=>(
                <RadioCard 
                    index={"content"+index+""+j}
                    key={j} 
                    isFavorite={checkFavorite(fm)}
                    channel={fm} 
                    fmList={props.fmList}
                    onFMSelect={props.onFMSelect} 
                    initSuccess={props.initSuccess}
                    currentChannelId={props.currentChannelId} 
                    refreshFav={props.refreshFav}
                />
            ))
        );
    }

    const updateSections = activeSections => {
        setActiveSections(activeSections)
    }

	return (
		<ScrollView ref={ref} style={{ paddingTop: 10}}>
            {props.fmList && props.fmList.length>0 && <Accordion
                sections={sections}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                touchableProps={{underlayColor:'#F5F5F5'}}
            />}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
    provinceText: {
        fontSize: 16,
        marginBottom: 5
    },
    provinceView: {
        borderBottomWidth:1,
        marginVertical:5,
        borderBottomColor:"#F5F5F5",
        paddingBottom:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20
    }
})

export default RadioListContainer