import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../actions/alertActions'
import { Alert } from 'react-bootstrap'
import { registerUser } from '../../actions/authActions'

const Register = ({ history }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const dispatch = useDispatch()
	const alerts = useSelector((state) => state.alerts)

	const { name, email, password, password2 } = formData

	const auth = useSelector((state) => state.auth)
	const { isAuthenticated } = auth
	const onInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	if (isAuthenticated) {
		history.push('dashboard')
	}
	const onFormSubmit = async (e) => {
		e.preventDefault()
		if (password !== password2) {
			dispatch(setAlert('Passwords do not match', 'danger'))
			console.log(alerts)
		} else {
			dispatch(registerUser(name, email, password))
			/* REQUEST IN BODY */
			// const newUser = {
			// 	name,
			// 	email,
			// 	password,
			// }
			// const config = {
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// }
			// const body = JSON.stringify(newUser)
			// try {
			// 	const res = await axios.post('/api/users', config)
			// 	console.log(res)
			// } catch (error) {
			// 	console.log(error.response)
			// }
		}
	}
	return (
		<>
			{' '}
			{/* {alerts.map((alert) => (
				<Alert key={alert.id} variant={alert.alertType}>
					{alert.msg}
				</Alert>
			))} */}
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(e) => onFormSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						required
						value={name}
						onChange={(e) => onInputChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onInputChange(e)}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						minLength='6'
						onChange={(e) => onInputChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						minLength='6'
						onChange={(e) => onInputChange(e)}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</>
	)
}

export default Register
