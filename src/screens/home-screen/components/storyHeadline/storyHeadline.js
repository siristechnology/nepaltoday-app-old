import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Modal } from 'react-native'
import RoundStory from './roundStory'
import { getReadStory, storeReadStory } from './storyStorage'
import SwiperStory from './swiperStory'

const StoryHeadline = (props) => {
    const [showStory, setShowStory] = useState(false)
    const [storyArticle, setStoryArticle] = useState({})
    const [readStory, setReadStory] = useState([])

    useEffect(() => {
        getReadStory().then(res=>{
            setReadStory(res || [])
        }).catch(err=>{
            setReadStory([])
        })
    }, [])

    const onNewStoryLoaded = (clickedArticle, newArticle) => {
        let newReadStories = [...readStory]
        newReadStories.push(clickedArticle)
        newReadStories.push(newArticle)
        storeReadStory(clickedArticle, newArticle)
        setReadStory(newReadStories)
    }

    const checkReadStory = (myArticle) => {
        let filterArr = readStory.filter(x=>x.title==myArticle.title)
        if(filterArr.length){
            return true
        }else{
            return false
        }
    }

    const getCommonElements = (arr1, arr2) => {
        console.log(arr1.length, arr2.length)
        let commonArr = []
        let titles = arr2.map(x=>x.title)
        console.log(titles)
        arr1.map(i=>{
            let element = arr2.filter(x=> x.title==i.title)[0]
            if(element && element.title){
                commonArr.push(element)
            }
        })
        console.log("ssssss",commonArr.length)
        return commonArr
    }

    const getUniqueElements = (arr1, arr2) => {
        let commonArr = []
        arr1.map(i=>{
            let element = arr2.filter(x=> x.title==i.title)
            if(element.length == 0){
                commonArr.push(i)
            }
        })
        console.log("dddddd",commonArr.length)
        return commonArr
    }

    let headlineArticles = props.headlineArticles || []
    const readHeadlineArticles = getCommonElements(headlineArticles, readStory)
    const unReadHeadlineArticles = getUniqueElements(headlineArticles, readStory)
    headlineArticles = unReadHeadlineArticles.concat(readHeadlineArticles)
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
                        isReadStory={checkReadStory(article)}
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
                    onNewStoryLoaded={onNewStoryLoaded}
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
