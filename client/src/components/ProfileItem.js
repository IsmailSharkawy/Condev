import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfiles } from '../actions/profileActions'

const ProfileItem = ({ profile }) => {
	// const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(getProfiles())
	// })
	const { user, status, company, location, skills } = profile
	const { _id, name, avatar } = user
	return (
		<div className='profile bg-light'>
			<img src={avatar} className='round-img' />
			<div>
				<h2>{name}</h2>
				<p>
					{status} {company && <span>at {company}</span>}
				</p>
				<p className='my-1'> {location && <span> {location}</span>}</p>
				<Link to={`/profile/${_id}`} className='btn btn-primary'>
					View Profile
				</Link>
			</div>

			<ul>
				{skills.slice(0, 4).map((skill, index) => (
					<li key={index} className='text-primary'>
						<i className='fas fa-check'></i>
						{skill}
					</li>
				))}
			</ul>
		</div>
	)
}

export default ProfileItem
