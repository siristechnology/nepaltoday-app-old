import types from './types.js'

export const initialState = {
	articles: {},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_FROM_CACHE_END: {
			return { ...state, articles: action.articles }
		}
		case types.REFRESH_CACHE_END: {
			return { ...state, articles: action.articles }
		}
		default: {
			return state
		}
	}
}
