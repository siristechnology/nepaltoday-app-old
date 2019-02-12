import types from "./types.js";

export const initialState = {
	loginStatus: "uninitiated",
	article: {}
};

export default function reducer (state = initialState, action) {
	switch (action.type) {
		case types.OPEN_ARTICLE_START: {
			console.log('state.article', state.article);
			return { ...state, article: { ...state.article } };
		}
		default: {
			return state;
		}
	}
};
