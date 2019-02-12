import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { commitMutation, graphql } from 'react-relay';

import environment from '../../environment.js';
import types from './types.js';


const watchOpenArticle = function* watchOpenArticle () {
	yield takeEvery(types.OPEN_ARTICLE_START, function* (input) {

		// make api call
	});
}

const homeSaga = function* homeSaga () {
	yield all([
		watchOpenArticle()
	]);
};


export default homeSaga;