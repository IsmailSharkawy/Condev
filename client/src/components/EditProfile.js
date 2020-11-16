import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProfile } from '../actions/profileActions'
import { Link } from 'react-router-dom'
import { setAlert } from '../actions/alertActions'
import { getProfile } from '../actions/profileActions.js'
const EditProfile = ({ history }) => {
	const [hidden, setHidden] = useState(false)
	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		bio: '',
		status: '',
		githubusername: '',
		skills: '',
		youtube: '',
		facebook: '',
		twitter: '',
		instagram: '',
		linkedin: '',
	})

	const {
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin,
	} = formData
	const dispatch = useDispatch()
	const onChange = (e) => {
		e.preventDefault()
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
	const profileGet = useSelector((state) => state.profile)
	const { created, loading, profile, edited } = profileGet
	const hideHandler = (e) => {
		setHidden(!hidden)
	}
	useEffect(() => {
		dispatch(getProfile())
	}, [])
	useEffect(() => {
		if (profile)
			if (!loading)
				setFormData({
					company: loading || !profile.company ? '' : profile.company,
					website: loading || !profile.website ? '' : profile.website,
					location: loading || !profile.location ? '' : profile.location,
					bio: loading || !profile.bio ? '' : profile.bio,
					status: loading || !profile.status ? '' : profile.status,
					githubusername:
						loading || !profile.githubusername ? '' : profile.githubusername,
					skills: loading || !profile.skills ? '' : profile.skills,
					youtube: loading || !profile.social ? '' : profile.social.youtube,
					facebook: loading || !profile.social ? '' : profile.social.facebook,
					twitter: loading || !profile.social ? '' : profile.social.twitter,
					instagram: loading || !profile.social ? '' : profile.social.instagram,
					linkedin: loading || !profile.social ? '' : profile.social.linkedin,
				})
		if (edited) {
			dispatch(setAlert('Profile edited successfully', 'success'))
		}
	}, [loading])
	return (
		<>
			<form
				className='form'
				onSubmit={(e) => {
					e.preventDefault()
					dispatch(createProfile(formData))
				}}
			>
				<div className='form-group'>
					<select
						name='status'
						value={status}
						onChange={(e) => {
							onChange(e)
						}}
					>
						<option value='0'>* Select Professional Status</option>
						<option value='Developer'>Developer</option>
						<option value='Junior Developer'>Junior Developer</option>
						<option value='Senior Developer'>Senior Developer</option>
						<option value='Manager'>Manager</option>
						<option value='Student or Learning'>Student or Learning</option>
						<option value='Instructor'>Instructor or Teacher</option>
						<option value='Intern'>Intern</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						Could be your own company or one you work for
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Website'
						name='website'
						value={website}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						Could be your own or a company website
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						City & state suggested (eg. Boston, MA)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Skills'
						name='skills'
						value={skills}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Github Username'
						name='githubusername'
						value={githubusername}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						If you want your latest repos and a Github link, include your
						username
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						value={bio}
						onChange={(e) => onChange(e)}
					></textarea>
					<small className='form-text'>Tell us a little about yourself</small>
				</div>

				<div className='my-2'>
					<button type='button' className='btn btn-light' onClick={hideHandler}>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{hidden && (
					<>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x'></i>
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={(e) => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x'></i>
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={(e) => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x'></i>
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={(e) => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x'></i>
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
								onChange={(e) => onChange(e)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x'></i>
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</>
				)}

				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</>
	)
}
export default EditProfile
