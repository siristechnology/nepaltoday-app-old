import gql from 'graphql-tag'
import client from './../graphql/graphql-client'
import crashlytics from '@react-native-firebase/crashlytics'

class NewsLikeService{
    postLike = async (nid, articleId, category) => {
        client
            .mutate({
                mutation: POST_LIKE,
                variables: {
                    input: {
                        nid,
                        articleId,
                        category
                    }
                }
            })
            .catch((reason) => crashlytics().recordError(reason))
    }

    postDislike = async (nid, articleId, category) => {
        client
            .mutate({
                mutation: POST_DISLIKE,
                variables: {
                    input: {
                        nid,
                        articleId,
                        category
                    }
                }
            })
            .catch((reason) => {
                crashlytics().recordError(reason)
            })
    }

    removeLike = async (nid, articleId) => {
        client
            .mutate({
                mutation: REMOVE_LIKE,
                variables: {
                    input: {
                        nid,
                        articleId,
                    }
                }
            })
            .catch((reason) => {
                crashlytics().recordError(reason)
            })
    }

    removeDislike = async (nid, articleId) => {
        client
            .mutate({
                mutation: REMOVE_DISLIKE,
                variables: {
                    input: {
                        nid,
                        articleId,
                    }
                }
            })
            .catch((reason) => {
                crashlytics().recordError(reason)
            })
    }

}

const POST_LIKE = gql`
    mutation postLikeMutation($input: PostLikeObj!){
        postLike(input: $input){
            success
        }
    }
`

const REMOVE_LIKE = gql`
    mutation RemoveLikeMutation($input: RemoveLikeObj!){
        removeLike(input: $input){
            success
        }
    }
`

const POST_DISLIKE = gql`
    mutation postDislikeMutation($input: PostLikeObj!){
        postDislike(input: $input){
            success
        }
    }
`
const REMOVE_DISLIKE = gql`
    mutation RemoveDislikeMutation($input: RemoveLikeObj!){
        removeDislike(input: $input){
            success
        }
    }
`

export default new NewsLikeService()