import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux'

import reducer from '../reducers'
import homeSagas from '../ducks/sagas.js'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware))

sagaMiddleware.run(homeSagas)

export { store }
