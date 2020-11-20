import React from 'react'
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native'

const RoundStory = (props) => {
    const article = props.article
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.storyView}
            onPress={()=>props.onShowStory(article)}
        >
            <Image 
                style={[styles.storyImage,{borderColor: props.isReadStory && '#000' || '#f00'}]}
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
        borderWidth: 3,
        borderColor: '#e57373'
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
