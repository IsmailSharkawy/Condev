import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const onInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const onFormSubmit = async (e) => {
		e.preventDefault()
		console.log('success')
	}
	return (
		<>
			{' '}
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(e) => onFormSubmit(e)}>
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

				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Dont have an account? <Link to='/register'>Sign up</Link>
			</p>
		</>
	)
}

export default Login