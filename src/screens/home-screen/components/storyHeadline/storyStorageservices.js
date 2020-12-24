import AsyncStorage from '@react-native-async-storage/async-storage'
const ASYNC_NAME = 'READ_STORY'

const fetchfromAsync = () => {
    return new Promise((resolve, reject)=> {
        AsyncStorage.getItem(ASYNC_NAME).then(res=>{
            if(res!=null){
                res = JSON.parse(res)
                resolve(res)
            }else{
                resolve([])
            }
        }).catch(err=> reject(err))        
    })
}

const storetoAsync = (article) => {
    fetchfromAsync().then(res=>{
        let readStories = [...res]
        readStories.push(article)
        readStories = readStories.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.title === thing.title
            ))
        )
        AsyncStorage.setItem(ASYNC_NAME, JSON.stringify(readStories))
    })
} 

export {
    fetchfromAsync,
    storetoAsync
}