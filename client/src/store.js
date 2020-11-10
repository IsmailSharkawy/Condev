import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { alertReducer } from './reducers/alertReducers'
//Import root reducer from wherever

const reducer = combineReducers({ alerts: alertReducer })
const initialState = {}
const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
