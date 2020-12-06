import AsyncStorage from '@react-native-async-storage/async-storage'
const ASYNC_NAME = 'LOCAL_ARTICLES'
const CATEGORY_ASYNC_NAME = 'CATEGORY_LOCAL_ARTICLES'

const storetoAsync = (articles) => {
	if (articles) {
		AsyncStorage.setItem(ASYNC_NAME, JSON.stringify(articles))
	}
}

const storeCategoryArticlestoAsync = (articles) => {
	if (articles) {
		AsyncStorage.setItem(CATEGORY_ASYNC_NAME, JSON.stringify(articles))
	}
}

const fetchfromAsync = () => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(ASYNC_NAME)
			.then((res) => {
				if (res != null) {
					res = JSON.parse(res)
					resolve(res)
				} else {
					resolve([])
				}
			})
			.catch((err) => reject(err))
	})
}

const fetchCategoryArticlesfromAsync = () => {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(CATEGORY_ASYNC_NAME)
			.then((res) => {
				if (res != null) {
					res = JSON.parse(res)
					resolve(res)
				} else {
					resolve([])
				}
			})
			.catch((err) => reject(err))
	})
}

const removeAsync = () => {
	AsyncStorage.removeItem(ASYNC_NAME)
}

export {
	storetoAsync,
	storeCategoryArticlestoAsync,
	fetchfromAsync,
	fetchCategoryArticlesfromAsync,
	removeAsync,
}
