import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, Modal } from 'react-native'
import RoundStory from './roundStory'
import SwiperStory from './swiperStory'

const StoryHeadline = (props) => {
    const [showStory, setShowStory] = useState(false)
    const [storyArticle, setStoryArticle] = useState({})
    const headlineArticles = props.headlineArticles || []
    
    const onShowStory = (article) => {
        setShowStory(true)
        setStoryArticle(article)
    }

    const onCloseStoryModal = () => {
        setShowStory(false)
    }

    const onShowArticleDetail = (article) => {
        setShowStory(false)
        props.onShowArticleDetail(article, headlineArticles)
    }
    
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.container}>
                {headlineArticles.map((article, i)=>(
                    <RoundStory
                        key={i}
                        article={article}
                        onShowStory={onShowStory}
                    />                
                ))}
            </View>
            <Modal
                visible={showStory}
                transparent={true}
                onRequestClose={onCloseStoryModal}
            >
                <SwiperStory
                    article={storyArticle}
                    articles={headlineArticles}
                    onCloseStory={onCloseStoryModal}
                    showArticleDetail={onShowArticleDetail}
                />
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5
    }
})

export default StoryHeadline
