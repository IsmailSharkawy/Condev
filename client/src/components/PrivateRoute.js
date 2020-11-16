import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './auth/Login'

const PrivateRoute = ({ component, history }) => {
	const auth = useSelector((state) => state.auth)
	const { loading, isAuthenticated } = auth
	console.log(loading)
	console.log(isAuthenticated)

	return (
		<>
			{!loading && !isAuthenticated ? (
				<Route component={Login} />
			) : (
				<Route component={component} />
			)}
		</>
	)
}

export default PrivateRoute
