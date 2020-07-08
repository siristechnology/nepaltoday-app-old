import types from './types.js'

export const initialState = {
	loginStatus: 'uninitiated',
	article: {},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_FROM_CACHE_END: {
			return { ...state, articles: { ...state.articles } }
		}
		case types.REFRESH_CACHE_END: {
			return { ...state, articles: { ...state.articles } }
		}
		default: {
			return state
		}
	}
}
