import types from './types.js'

const startToOpenArticle = article => {
	return { type: types.OPEN_ARTICLE_START, article }
}

const fetchArticlesFromCache = () => {
	return { type: types.FETCH_FROM_CACHE_START }
}

const refreshCache = () => {
	return { type: types.REFRESH_CACHE_START }
}

export default {
	startToOpenArticle,
	fetchArticlesFromCache,
	refreshCache
}