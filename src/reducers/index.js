import { combineReducers } from "redux";

import homeReducer from '../home/ducks/reducer.js';

const rootReducer = combineReducers({
	homeReducer
});

export default rootReducer;