import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlert } from '../actions/alertActions'
import { addExperience } from '../actions/profileActions'

const AddExperience = ({ history }) => {
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})

	const profile = useSelector((state) => state.profile)
	const { edited } = profile
	const dispatch = useDispatch()
	const { company, title, location, from, to, current, description } = formData
	const [enable, setEnable] = useState(current)
	useEffect(() => {
		if (edited) {
			dispatch(setAlert('Experience added successfully', 'success'))
			history.push('/dashboard')
		}
	}, [dispatch, edited])
	const onEnableChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })

		setEnable(!enable)
		console.log(enable)
		console.log(e.target.name, e.target.value)
	}
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })

		console.log(e.target.name, e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(addExperience(formData))
	}
	return (
		<>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Job Title'
						name='title'
						required
						value={title}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Company'
						name='company'
						required
						value={company}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={!enable}
							onChange={(e) => onEnableChange(e)}
						/>{' '}
						Current Job
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						disabled={enable}
						value={to}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						value={description}
						onChange={(e) => onChange(e)}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</>
	)
}

export default AddExperience
