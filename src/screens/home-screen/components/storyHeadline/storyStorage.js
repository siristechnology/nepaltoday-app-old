import AsyncStorage from '@react-native-community/async-storage'
const ASYNC_NAME = "READ_STORY"

const storeReadStory = (article1, article2) => {
    if(article1 && article2 && article1.title && article2.title){
        getReadStory().then(res=>{
            res = res || []
            res.push(article1)
            res.push(article2)
            res = res.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.title === thing.title
                ))
            )
            AsyncStorage.setItem(ASYNC_NAME, JSON.stringify(res))
        })
    }
}

const getReadStory = () => {
    return new Promise((resolve, reject)=> {
        AsyncStorage.getItem(ASYNC_NAME).then(res=>{
            if(res!=null){
                res = JSON.parse(res) || []
                resolve(res)
            }else{
                resolve([])
            }
        }).catch(err=>reject(err))
    })
}

export {
    storeReadStory,
    getReadStory
}