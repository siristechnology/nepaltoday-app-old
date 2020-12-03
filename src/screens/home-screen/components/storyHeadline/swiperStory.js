import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import { Button } from '@ui-kitten/components'
import { IconButton } from 'react-native-paper'
import { np } from '../../../../lang/np'

const SwiperStory = (props) => {
    const {article, articles} = props
    const { READ_MORE } = np.public
    const SingleStory = ({myArticle}) => {
        return(
            <View style={styles.container}>
                <IconButton
                    style={styles.closeButton}
                    icon="close"
                    size={25}
                    color="#fff"
                    onPress={props.onCloseStory}
                />
                <Image
                    source={{uri: myArticle.imageLink}}
                    style={styles.storyImage}
                />
                <Text style={styles.storyText}>
                    {myArticle.title}
                </Text>
                <Text style={styles.shortDescription}>
                    {myArticle.shortDescription ? myArticle.shortDescription.substring(0, 400) + '...' : ''}
                </Text>
                <Button style={styles.readMoreButton} onPress={()=>props.showArticleDetail(myArticle)}>
					{READ_MORE}
				</Button>
            </View>
        )  
    }

    const getArticleIndex = () => {
        let myArticle = articles.filter(x=>x.title == article.title)[0]
        return articles.indexOf(myArticle)
    }

    return (
        <Swiper 
            showsButtons={true} 
            autoplay={true}
            loop={false}
            showsPagination={false}
            autoplayTimeout={5}
            index={getArticleIndex()}
            onIndexChanged={(i)=>props.onStorySwiped(articles[i])}
            removeClippedSubviews={false}
            scrollEnabled={false}
        >
            {articles.map((singleArticle,i)=>(
                <SingleStory
                    key={i}
                    myArticle={singleArticle}
                />
            ))}
        </Swiper>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.95)'
    },
    storyImage: {
        height: 250,
        width: '100%',
        resizeMode: 'stretch'
    },
    storyText: {
        fontSize: 22,
        marginTop: 40,
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#fff',
        opacity: 0.9
    },
    shortDescription: {
        fontSize: 16,
        marginTop: 20,
        marginHorizontal: 20,
        textAlign: 'center',
        color: '#fff',
        opacity: 0.8
    },
    readMoreButton: {
        marginTop: 70,
        width: 200
    },
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 111,
        elevation: 1,
        backgroundColor: '#000'
    }
})

export default SwiperStory
