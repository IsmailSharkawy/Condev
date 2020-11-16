import { USER_LOGOUT } from '../constants/authConstants'
import {
	GET_REPOS,
	PROFILES_GET,
	PROFILE_CREATE_REQUEST,
	PROFILE_CREATE_SUCCESS,
	PROFILE_EDUCATION_DELETE,
	PROFILE_EXPERIENCE_DELETE,
	USER_PROFILE_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_RESET,
	USER_PROFILE_SUCCESS,
} from '../constants/profileConstants'

export const ProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_PROFILE_REQUEST:
		case PROFILE_CREATE_REQUEST:
			return {
				loading: true,
				created: false,
				edited: false,
				addedExp: false,
				addedEdu: false,
				deleted: false,
				reposLoading: true,
			}
		case GET_REPOS:
			return {
				...state,
				repos: action.payload,
				reposLoading: false,
			}
		case PROFILES_GET:
			return { ...state, profiles: action.payload, loading: false }
		case USER_PROFILE_SUCCESS:
			return { loading: false, profile: action.payload, success: true }
		case PROFILE_CREATE_SUCCESS:
			return { created: true, edited: true, addedEdu: true, addedExp: true }
		case PROFILE_EDUCATION_DELETE:
		case PROFILE_EXPERIENCE_DELETE:
			return { ...state, deleted: true }
		case USER_PROFILE_FAIL:
		case USER_LOGOUT:
		case USER_PROFILE_RESET:
			return {
				...state,
				loading: false,
				success: false,
				profile: null,
			}

		default:
			return state
	}
}
