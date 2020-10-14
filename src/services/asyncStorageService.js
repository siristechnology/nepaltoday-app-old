import AsyncStorage from '@react-native-community/async-storage'
const READ_ARTICLES = "READ_ARTICLES"

const saveReadArticles = (articleId) => {
    AsyncStorage.getItem(READ_ARTICLES).then(res=>{
        let oldArticleIds = []
        let articles = []
        if(res!=null){
            articles = oldArticleIds.concat(JSON.parse(res))
            articles.push(articleId)
            articles = [...new Set(articles)]
            AsyncStorage.setItem(READ_ARTICLES, JSON.stringify(articles))
        }else{
            articles.push(articleId)
            AsyncStorage.setItem(READ_ARTICLES, JSON.stringify(articles))
        }
    })
}

const getReadArticles = async () => {
    readArticles = await AsyncStorage.getItem(READ_ARTICLES)
    readArticles = JSON.parse(readArticles) || []
    return readArticles
}

const clearReadArticles = () => {
    AsyncStorage.removeItem(READ_ARTICLES)
}

export {
    saveReadArticles,
    getReadArticles,
    clearReadArticles
}