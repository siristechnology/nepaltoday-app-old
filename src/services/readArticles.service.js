import client from '../../src/graphql/graphql-client'
import gql from 'graphql-tag'
import crashlytics from '@react-native-firebase/crashlytics'

class ReadArticleService{
    saveReadArticle = async (nid, articles) => {
        articles = articles.map(article=>{
            return {
                articleId: article.articleId, 
                category: article.category,
                createdDate: new Date()
            }
        })
        client
            .mutate({
                mutation: SAVE_READ_ARTICLE,
                variables: {
                    input: {
                        nid,
                        articles
                    }
                } 
            })
            .catch((reason) => crashlytics().recordError(reason))
    }
}

const SAVE_READ_ARTICLE = gql`
    mutation saveReadArticleMutation($input: SaveReadArticle!){
        saveReadArticle(input: $input){
            success
        }
    }
`

export default new ReadArticleService()