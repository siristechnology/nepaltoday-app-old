import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ShowMoreModal = (props) => {
    const {article} = props
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.container}
            onPress={props.onCloseShowMoreModal}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.modalView}
            >
                <TouchableOpacity 
                    activeOpacity={0.8}
                    style={styles.shareButton}
                >
                    <Icon 
                        name="share-variant"
                        size={20}
                        color="#000"
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
                        onPress={()=>props.onArticleLiked(article)}
                    >
                        <Icon
                            name="thumb-up-outline"
                            size={30}
                            style={styles.likeIcon}
                            color="#000"
                        />
                        <Text style={styles.text}>
                            Like
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.verticalLine} />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.likeButton}
                        onPress={()=>props.onArticleDisliked(article)}
                    >
                        <Icon
                            name="thumb-down-outline"
                            size={30}
                            style={styles.likeIcon}
                            color="#000"
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
        backgroundColor: '#fff',
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
        color: '#000',
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
