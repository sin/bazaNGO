import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import createReducers from 'reducers'

const configureStore = (history, initialStore = {}) => {
  const historyMiddleware = routerMiddleware(history)
  const devtools = window.devToolsExtension || (() => noop => noop)

  return createStore(
    createReducers(),
    initialStore,
    compose(devtools(), applyMiddleware(historyMiddleware))
  )
}

export default configureStore
