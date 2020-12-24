import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Modal } from 'react-native'
import RoundStory from './roundStory'
import { fetchfromAsync, storetoAsync } from './storyStorageservices'
import SwiperStory from './swiperStory'

const StoryHeadline = (props) => {
    const [showStory, setShowStory] = useState(false)
    const [storyArticle, setStoryArticle] = useState({})
    const headlineArticles = props.headlineArticles || []
    const [readStory, setReadStory] = useState([])

    useEffect(()=>{
        fetchfromAsync().then(res=>{
            setReadStory(res)
        }).catch(err=>setReadStory([]))
    },[])

    const onStoryLoaded = (article) => {
        storetoAsync(article)
    }
    
    const onShowStory = (article) => {
        setStoryArticle(article)
        setShowStory(true)
        onStoryLoaded(article)
    }

    const onCloseStoryModal = () => {
        setShowStory(false)
        setStoryArticle({})
    }

    const onShowArticleDetail = (article) => {
        setShowStory(false)
        props.onShowArticleDetail(article, headlineArticles)
    }

    const getSortedStories = (arr1, arr2) => {
        let commonArr = []
        arr1.map(i=>{
            let element = arr2.filter(x=> x.title==i.title)[0]
            if(element && element.title){
                commonArr.push(element)
            }
        })
        let differenceArr = []
        arr1.map(i=>{
            let element = arr2.filter(x=> x.title==i.title)
            if(element.length == 0){
                differenceArr.push(i)
            }
        })
        const allStories = differenceArr.concat(commonArr)
        return allStories
    }

    const sortedStories = getSortedStories(headlineArticles, readStory)
    
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.container}>
                {sortedStories.map((article, i)=>(
                    <RoundStory
                        key={i}
                        article={article}
                        onShowStory={onShowStory}
                        readStory={readStory}
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
                    onStorySwiped={onStoryLoaded}
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
