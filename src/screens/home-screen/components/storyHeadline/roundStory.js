import React from 'react'
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native'

const RoundStory = (props) => {
    const article = props.article
    const readStory = props.readStory || []

    const checkReadStory = (article) => {
        const filteredArr = readStory.filter(x=>x.title==article.title)
        if(filteredArr.length>0){
            return true
        }else{
            return false
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.storyView}
            onPress={()=>props.onShowStory(article)}
        >
            <Image 
                style={[styles.storyImage,{borderColor: checkReadStory(article) && '#BDBDBD' || '#e57373'}]}
                source={{uri: article.imageLink}}
            />
            <Text style={styles.sourceText}>
                {article.source.name}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    storyImage: {
        height: 70,
        width: 70,
        borderRadius: 40,
        borderWidth: 3
    },
    storyView: {
        marginRight: 10,
        alignItems: 'center'
    },
    sourceText: {
        fontSize: 13,
        color: '#000',
        opacity: 0.7
    }
})

export default RoundStory
