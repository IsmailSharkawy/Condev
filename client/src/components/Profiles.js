import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProfiles } from '../actions/profileActions'
import ProfileItem from './ProfileItem'

const Profiles = () => {
	const profile = useSelector((state) => state.profile)
	const { profiles, loading } = profile
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getProfiles())
	}, [dispatch])
	return (
		<>
			{loading ? (
				<>
					<Spinner
						animation='border'
						role='status'
						style={{
							margin: 'auto',
							display: 'block',
						}}
					>
						{' '}
						<span className='sr-only'> Loading.....</span>
					</Spinner>
				</>
			) : (
				<>
					{profiles && profiles.length > 0 ? (
						profiles.map((profile) => <ProfileItem profile={profile} />)
					) : (
						<h4>No profiles found</h4>
					)}{' '}
				</>
			)}
		</>
	)
}

export default Profiles
