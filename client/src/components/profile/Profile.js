import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadUser } from '../../actions/authActions'

import { getProfileById, getRepos } from '../../actions/profileActions'

const Profile = ({ match }) => {
	const dispatch = useDispatch()
	const id = match.params.id
	const profileState = useSelector((state) => state.profile)
	const { profile, loading, repos } = profileState

	const auth = useSelector((state) => state.auth)
	const { user } = auth

	useEffect(() => {
		dispatch(getProfileById(id))
	}, [])
	// useEffect(() => {
	// 	if (reposLoading && profile) dispatch(getRepos(profile.githubusername))
	// }, [reposLoading, profile])

	const onClickHandler = () => {
		if (profile) dispatch(getRepos(profile.githubusername))
	}
	return (
		<>
			{loading ? (
				<>
					<Spinner
						animation='border'
						role='status'
						style={{
							width: '100px',
							height: '100px',
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
					<Link
						to='/profiles'
						className='btn btn-light'
						// style={{ paddingTop: '2vh' }}
					>
						Go back
					</Link>
					{user && user._id === id ? (
						<Link to='/edit-profile' className='btn btn-dark'>
							Edit profile
						</Link>
					) : null}
					<div class='profile-top bg-primary p-2'>
						<img
							class='round-img my-1'
							src={profile && profile.user && profile.user.avatar}
							alt=''
						/>
						<h1 class='large'>
							{profile && profile.user && profile.user.name}
						</h1>
						<p class='lead'>{profile && profile.status}</p>
						<p>{profile && profile.location}</p>
						{profile && profile.social && profile.website}
						<div class='icons my-1'>
							<a href='#' target='_blank' rel='noopener noreferrer'>
								<i class='fas fa-globe fa-2x'></i>
							</a>
							<a href='#' target='_blank' rel='noopener noreferrer'>
								<i class='fab fa-twitter fa-2x'></i>
							</a>
							<a href='#' target='_blank' rel='noopener noreferrer'>
								<i class='fab fa-facebook fa-2x'></i>
							</a>
							<a href='#' target='_blank' rel='noopener noreferrer'>
								<i class='fab fa-linkedin fa-2x'></i>
							</a>
							<a href='#' target='_blank' rel='noopener noreferrer'>
								<i class='fab fa-youtube fa-2x'></i>
							</a>
							<a href='#' target='_blank' rel='noopener noreferrer'>
								<i class='fab fa-instagram fa-2x'></i>
							</a>
						</div>
					</div>

					<div class='profile-about bg-light p-2 my-2'>
						<h2 class='text-primary'>{profile && profile.user.name}'s Bio</h2>
						<p>{profile && profile.bio}</p>
						<div class='line'></div>
						<h2 class='text-primary'>Skill Set</h2>
						<div class='skills'>
							{profile &&
								profile.skills.map((skill) => (
									<div class='p-1' key={skill._id}>
										<i key={skill._id} class='fa fa-check'></i> {skill}
									</div>
								))}
						</div>
					</div>

					<div class='profile-exp bg-white p-2'>
						<h2 class='text-primary'>Experience</h2>
						<div>
							{profile &&
								profile.experience.length > 0 &&
								profile.experience.map((experience) => (
									<>
										<h3 class='text-dark'>{experience.company}</h3>
										<p>
											<Moment format='YYYY/MM/DD'>{experience.from}</Moment> -{' '}
											{experience.to === null ? (
												<>Now</>
											) : (
												<Moment format='YYYY/MM/DD'>{experience.to}</Moment>
											)}
										</p>
										<p>
											<strong>Position: </strong>
											{experience.title}
										</p>
										<p>
											<>
												<strong>Description: </strong>{' '}
												{experience && experience.description && (
													<p> {experience.description}</p>
												)}
											</>
										</p>
									</>
								))}
						</div>
					</div>
					<div class='profile-edu bg-white p-2 my-2'>
						<h2 class='text-primary'>Education</h2>
						<div>
							{profile &&
								profile.education.length > 0 &&
								profile.education.map((education) => (
									<>
										<h3 class='text-dark'>{education.school}</h3>
										<p>
											<Moment format='YYYY/MM/DD'>{education.from}</Moment> -{' '}
											{education.to === null ? (
												<>Now</>
											) : (
												<Moment format='YYYY/MM/DD'>{education.to}</Moment>
											)}
										</p>
										<p>
											<strong>Degree: </strong>
											{education.degree}
										</p>
										<p>
											<strong>Field of Study: </strong>
											{education.fieldofstudy}
										</p>
										<p>
											<>
												<strong>Description: </strong>{' '}
												{education && education.description && (
													<p> {education.description}</p>
												)}
											</>
										</p>
									</>
								))}
						</div>
					</div>
					<button className='btn btn-primary' onClick={onClickHandler}>
						Extract repos
					</button>
					<div class='profile-github'>
						<h2 class='text-primary my-1'>
							<i class='fab fa-github'></i> Github Repos
						</h2>
						<div class='repo bg-white p-1 my-1'>
							<ul>
								{repos &&
									repos.map((repo) => (
										<li>
											<div>
												<h4>
													<a href='#' target='_blank' rel='noopener noreferrer'>
														{repo.name}
													</a>
												</h4>
												<strong
													style={{
														flexGrow: 1,
													}}
												>
													Description:{repo.description} Lorem ipsum dolor sit
													amet consectetur adipisicing elit. Ea excepturi
													debitis, quas molestiae voluptate quod ratione minus
													necessitatibus nobis non.{' '}
												</strong>
											</div>

											<div>
												<ul>
													<li class='badge badge-primary'>
														Stars: {repo.stargazers_count}
													</li>
													<li class='badge badge-dark'>
														Watchers: {repo.watchers}
													</li>
													<li class='badge badge-light'>Forks: {repo.forks}</li>
												</ul>
											</div>
										</li>
									))}
							</ul>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default Profile
