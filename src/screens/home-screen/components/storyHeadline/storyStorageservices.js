import AsyncStorage from '@react-native-community/async-storage'
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

const storetoAsync = (articles) => {
    AsyncStorage.setItem(ASYNC_NAME, JSON.stringify(articles))
} 

export {
    fetchfromAsync,
    storetoAsync
}