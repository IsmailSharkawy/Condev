import {
	AUTH_FAIL,
	USER_LOAD,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from '../constants/authConstants'

export const authReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
		case USER_LOGIN_REQUEST:
			return { loading: true, isAuthenticated: false }
		case USER_LOAD:
			return { isAuthenticated: true, user: action.payload, loading: false }
		case USER_REGISTER_SUCCESS:
		case USER_LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return { loading: false, user: action.payload, isAuthenticated: true }

		case USER_REGISTER_FAIL:
		case AUTH_FAIL:
		case USER_LOGIN_FAIL:
		case USER_LOGOUT:
			localStorage.removeItem('token')

			return {
				...state,
				loading: false,
				success: false,
				isAuthenticated: false,
				token: null,
				user: null,
			}

		default:
			return state
	}
}
