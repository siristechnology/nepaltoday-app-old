import types from './types.js'

const startToOpenArticle = article => {
	return { type: types.OPEN_ARTICLE_START, article }
}

export default {
	startToOpenArticle
}
