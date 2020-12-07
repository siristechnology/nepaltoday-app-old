import AsyncStorage from '@react-native-async-storage/async-storage'
const READ_ARTICLES = "READ_ARTICLES"
const DARK_MODE = 'DARK_MODE'

const saveReadArticles = (article) => {
    AsyncStorage.getItem(READ_ARTICLES).then(res=>{
        let oldArticles = []
        let articles = []
        if(res!=null){
            articles = oldArticles.concat(JSON.parse(res))
            articles.push(article)
            articles = articles.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.articleId === thing.articleId
                ))
            )
            AsyncStorage.setItem(READ_ARTICLES, JSON.stringify(articles))
        }else{
            articles.push(article)
            AsyncStorage.setItem(READ_ARTICLES, JSON.stringify(articles))
        }
    })
}

const getReadArticles = async () => {
    let readArticles = await AsyncStorage.getItem(READ_ARTICLES)
    readArticles = JSON.parse(readArticles) || []
    return readArticles
}

const clearOldArticles = async () => {
    let readArticles = await AsyncStorage.getItem(READ_ARTICLES)
    readArticles = JSON.parse(readArticles) || []
    let currentTimeStamp = Date.now()
    let newArticles = []
    readArticles.forEach(article=>{
        if(currentTimeStamp - article.timeStamp < 432000000){
            newArticles.push(article)
        }
    })
    AsyncStorage.setItem(READ_ARTICLES, JSON.stringify(newArticles))
}

const setMode = (mode) => {
    AsyncStorage.setItem(DARK_MODE, JSON.stringify({mode}))
}

const getMode = async () => {
    let mode = await AsyncStorage.getItem(DARK_MODE)
    mode = JSON.parse(mode) || {mode: false}
    return mode.mode
}

export {
    saveReadArticles,
    getReadArticles,
    clearOldArticles,
    setMode,
    getMode
}