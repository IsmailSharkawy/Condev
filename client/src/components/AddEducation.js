import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlert } from '../actions/alertActions'
import { addEducation, addExperience } from '../actions/profileActions'

const AddEducation = ({ history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})

	const profile = useSelector((state) => state.profile)
	const { edited } = profile
	const dispatch = useDispatch()
	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description,
	} = formData
	const [enable, setEnable] = useState(current)
	useEffect(() => {
		if (edited) {
			dispatch(setAlert('Education added successfully', 'success'))
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
		dispatch(addEducation(formData))
	}
	return (
		<>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any schools/bootcamps you
				were a part of in the past
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* School'
						name='school'
						required
						value={school}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder=' degree'
						name='degree'
						value={degree}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Field of Study'
						name='fieldofstudy'
						value={fieldofstudy}
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

export default AddEducation
