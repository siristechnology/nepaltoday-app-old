import AsyncStorage from '@react-native-community/async-storage';
const ASYNC_NAME = 'LOCAL_ARTICLES'

const storetoAsync = (articles) => {
    AsyncStorage.setItem(ASYNC_NAME,JSON.stringify(articles))
}

const fetchfromAsync = () => {
    return new Promise((resolve, reject)=>{
        AsyncStorage.getItem(ASYNC_NAME).then(res=>{
            if(res!=null){
                res = JSON.parse(res)
                resolve(res)
            }else{
                resolve([])
            }
        }).catch(err=>reject(err))
    })
}

export {
    storetoAsync,
    fetchfromAsync
}