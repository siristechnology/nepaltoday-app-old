import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Share } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from '@react-native-firebase/auth'
import { NEPALTODAY_URL } from '../../../../layout/article/article-detail/article-detail.component'

const ShowMoreModal = (props) => {

    const [article, setArticle] = useState(props.article)

    const nid = auth().currentUser.uid
    const checkLike = (myArticle) => {
        const likes = myArticle.likes || []
        const likeArr = likes.filter(x => x.nid==nid)
        if(likeArr.length==0){
            return false
        }else{
            return true
        }
    }

    const checkDislike = (myArticle) => {
        const dislikes = myArticle.dislikes || []
        const dislikeArr = dislikes.filter(x => x.nid==nid)
        if(dislikeArr.length==0){
            return false
        }else{
            return true
        }
    }

    const onArticleLiked = (myArticle)=> {
        let clickArticle = {...myArticle}
        let likes = clickArticle.likes || []
        const check = checkLike(article)
        if(check){
            likes = likes.filter(x=>x.nid!=nid)
            clickArticle.likes = likes
            setArticle(clickArticle)
            props.onLikeRemoved(myArticle)
        }else{
            likes.push({nid})
            clickArticle.likes = likes
            let dislikes = clickArticle.dislikes || []
            dislikes = dislikes.filter(x=>x.nid!=nid)
            clickArticle.dislikes = dislikes
            setArticle(clickArticle)
            props.onArticleLiked(myArticle)
        }
    }

    const onArticleDisliked = (myArticle) => {
        let clickArticle = {...myArticle}
        let dislikes = clickArticle.dislikes || []
        const check = checkDislike(article)
        if(check){
            dislikes = dislikes.filter(x=>x.nid!=nid)
            clickArticle.dislikes = dislikes
            setArticle(clickArticle)    
            props.onDislikeRemoved(myArticle)
        }else{
            dislikes.push({nid})
            clickArticle.dislikes = dislikes
            let likes = clickArticle.likes || []
            likes = likes.filter(x=>x.nid!=nid)
            clickArticle.likes = likes
            setArticle(clickArticle)
            props.onArticleDisliked(myArticle)
        }
    }

    const onShareClick = () => {
		const { title, link } = article
		Share.share({
			message: title + '  ' + link + ' #NEPALTODAYAPP ' + NEPALTODAY_URL,
			url: link,
			title: title,
		})
    }
    
    const theme = useTheme()

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.container}
            onPress={props.onCloseShowMoreModal}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.modalView,{backgroundColor: theme.colors.background}]}
            >
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={styles.shareButton}
                    onPress={onShareClick}
                >
                    <Icon 
                        name="share-variant"
                        size={20}
                        color={theme.colors.secondary}
                        style={styles.shareIcon}
                    />
                    <Text style={styles.text}>
                        Share News
                    </Text>
                </TouchableOpacity>
                <Divider style={styles.divider}/>
                <View style={styles.likeView}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.likeButton}
                        onPress={()=>onArticleLiked(article)}
                    >
                        <Icon
                            name={checkLike(article) && "thumb-up" || "thumb-up-outline"}
                            size={30}
                            style={styles.likeIcon}
                            color={theme.colors.secondary}
                        />
                        <Text style={styles.text}>
                            Like
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.verticalLine} />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.likeButton}
                        onPress={()=>onArticleDisliked(article)}
                    >
                        <Icon
                            name={checkDislike(article) && "thumb-down" || "thumb-down-outline"}
                            size={30}
                            style={styles.likeIcon}
                            color={theme.colors.secondary}
                        />
                        <Text style={styles.text}>
                            Dislike
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    modalView: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    },
    shareButton: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareIcon: {
        opacity: 0.7,
        marginRight: 20
    },
    likeIcon: {
        opacity: 0.7
    },
    likeView: {
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10
    },
    likeButton: {
        flex: 0.495,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        color: '#000',
        opacity: 0.5,
        height: 1,
        width: '100%',
        marginVertical: 20,
    },
    text: {
        fontSize: 16,
        opacity: 0.8
    },
    verticalLine: {
        backgroundColor: '#000',
        opacity: 0.1,
        width: 1,
        height: '90%'
    }
})

export default ShowMoreModal
