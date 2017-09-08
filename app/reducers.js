import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const createReducers = () => {
  return combineReducers({
    router: routerReducer
  })
}

export default createReducers
