import Realm from 'realm';

const setMongoRealm=()=>{
    new Realm({
        path: 'ArticleDatabase.realm',
        schema: [
            {
                name: 'articles',
                properties: {
                    '_id': 'string',
                    'title': 'string',
                    'shortDescription': 'string',
                    'imageLink': 'string',
                    'content': 'string',
                    'link': 'string',
                    'publishedDate': 'string',
                    'category': 'string',
                    'source': {
                        "type": "source"
                    },
                    'modifiedDate': 'string',
                }
            },{
                name :'source',
                properties: {
                    "_id":"string",
                    "name":"string",
                    "logoLink":"string"
                }
            }
        ]
    })
}

const getLocalStoredArticles = () => {
    let realm = new Realm({ path: 'ArticleDatabase.realm' })
    let storedArticles = realm.objects('articles')
    return storedArticles
}

const setRealmArticles = (articles) => {
    let realm = new Realm({ path: 'ArticleDatabase.realm' })
    realm.write(()=>{
        let deletingArticles = realm.objects('articles')
        realm.delete(deletingArticles)
        articles.forEach(obj=>{
            realm.create('articles',obj)
        })
    })
}

export {
    setMongoRealm,
    getLocalStoredArticles,
    setRealmArticles
}