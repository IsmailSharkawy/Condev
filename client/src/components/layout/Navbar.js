import React from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/authActions'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { isAuthenticated, loading } = auth
	const logoutHandler = () => {
		dispatch(logoutUser())
	}
	const guestLink = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	)
	const userLink = (
		<ul>
			<li>
				<Link to='/dashboard'>Dashboard</Link>
			</li>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<li className='items'></li>

				<a
					onClick={logoutHandler}
					style={{
						cursor:
							'url(data:image/png;base64,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) 8 3, auto',
					}}
				>
					<i className='fas fa-sign-out-alt'></i> Logout
				</a>
			</li>
		</ul>
	)
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevConnector
				</Link>
			</h1>

			{!loading && isAuthenticated && userLink}
			{!loading && !isAuthenticated && guestLink}
		</nav>
	)
}

export default Navbar
