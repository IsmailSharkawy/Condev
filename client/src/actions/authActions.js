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
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { SET_ALERT } from '../constants/alertConstants'
import { setAlert } from './alertActions'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}
	try {
		const { data } = await axios.get('/api/auth')
		console.log('data', data)
		dispatch({ type: USER_LOAD, payload: data })
	} catch (error) {
		dispatch({ type: AUTH_FAIL })
	}
}

export const logoutUser = () => async (dispatch) => {
	dispatch({ type: USER_LOGOUT })
}
export const registerUser = (name, email, password) => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({ type: USER_REGISTER_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			`/api/users`,
			{ name, email, password },
			config
		)
		console.log(data)
		localStorage.setItem('token', JSON.stringify(data))
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch(
			setAlert(
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
				'danger',
				id
			)
		)

		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const loginUser = (email, password) => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({ type: USER_LOGIN_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(`/api/auth`, { email, password }, config)
		console.log(data)
		localStorage.setItem('token', JSON.stringify(data))
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
	} catch (error) {
		console.log(error.response)
		dispatch(
			setAlert(
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
				'danger',
				id
			)
		)

		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}
