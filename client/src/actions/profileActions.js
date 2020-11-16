import { v4 as uuidv4 } from 'uuid'
import {
	GET_REPOS,
	PROFILES_GET,
	PROFILE_CREATE_FAIL,
	PROFILE_CREATE_REQUEST,
	PROFILE_CREATE_SUCCESS,
	PROFILE_EDUCATION_DELETE,
	PROFILE_EXPERIENCE_DELETE,
	USER_PROFILE_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_SUCCESS,
} from '../constants/profileConstants'
import axios from 'axios'
import { setAlert } from './alertActions'

export const getProfile = () => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({ type: USER_PROFILE_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.get(`/api/profile/me`, config)
		dispatch({
			type: USER_PROFILE_SUCCESS,
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
			type: USER_PROFILE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const getProfiles = () => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({ type: USER_PROFILE_REQUEST })
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.get(`/api/profile/`, config)
		dispatch({
			type: PROFILES_GET,
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
			type: USER_PROFILE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const getRepos = (username) => async (dispatch) => {
	const id = uuidv4()

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.get(`/api/profile/github/${username}`, config)
		dispatch({
			type: GET_REPOS,
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
			type: USER_PROFILE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const getProfileById = (userId) => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({ type: USER_PROFILE_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.get(`/api/profile/user/${userId}`, config)
		dispatch({
			type: USER_PROFILE_SUCCESS,
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
			type: USER_PROFILE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const createProfile = (formData) => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({
			type: PROFILE_CREATE_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		console.log(formData)
		const { data } = await axios.post(`/api/profile`, formData, config)
		dispatch({
			type: PROFILE_CREATE_SUCCESS,
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
			type: PROFILE_CREATE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const addExperience = (formData) => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({
			type: PROFILE_CREATE_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		console.log(formData)
		const { data } = await axios.put(
			`/api/profile/experience`,
			formData,
			config
		)
		dispatch({
			type: PROFILE_CREATE_SUCCESS,
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
			type: PROFILE_CREATE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const addEducation = (formData) => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({
			type: PROFILE_CREATE_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		console.log(formData)
		const { data } = await axios.put(`/api/profile/education`, formData, config)
		dispatch({
			type: PROFILE_CREATE_SUCCESS,
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
			type: PROFILE_CREATE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const deleteEducation = (userid) => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({
			type: PROFILE_CREATE_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.delete(
			`/api/profile/education/${userid}`,
			config
		)
		dispatch({
			type: PROFILE_EDUCATION_DELETE,
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
			type: PROFILE_CREATE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}

export const deleteExperience = (userid) => async (dispatch) => {
	const id = uuidv4()

	try {
		dispatch({
			type: PROFILE_CREATE_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.delete(
			`/api/profile/experience/${userid}`,
			config
		)
		dispatch({
			type: PROFILE_EXPERIENCE_DELETE,
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
			type: PROFILE_CREATE_FAIL,
			payload:
				error.response && error.response.data.msg
					? error.response.data.msg
					: error.message,
		})
	}
}
