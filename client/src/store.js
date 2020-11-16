import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { alertReducer } from './reducers/alertReducers'
import { authReducer } from './reducers/authReducers'
import { ProfileReducer } from './reducers/profileReducers'
//Import root reducer from wherever

const reducer = combineReducers({
	alerts: alertReducer,
	auth: authReducer,
	profile: ProfileReducer,
})
const initialState = {}
const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
