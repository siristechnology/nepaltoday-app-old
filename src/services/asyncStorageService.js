import AsyncStorage from '@react-native-community/async-storage'
const READ_ARTICLES = "READ_ARTICLES"

const saveReadArticles = (article) => {
    AsyncStorage.getItem(READ_ARTICLES).then(res=>{
        let oldArticles = []
        let articles = []
        if(res!=null){
            articles = oldArticles.concat(JSON.parse(res))
            articles.push(article)
            articles = articles.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.id === thing.id
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
    let articles = readArticles.map(article=> article.id)
    return articles
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

export {
    saveReadArticles,
    getReadArticles,
    clearOldArticles
}