import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../actions/authActions'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import {
	deleteEducation,
	deleteExperience,
	getProfile,
} from '../actions/profileActions'
import DashProfileActions from '../components/DashProfileActions'
import { USER_LOAD } from '../constants/authConstants'
import { Button, Table } from 'react-bootstrap'
import { setAlert } from '../actions/alertActions'

const Dashboard = ({ history }) => {
	const dispatch = useDispatch()
	const profileGet = useSelector((state) => state.profile)

	const auth = useSelector((state) => state.auth)
	const { isAuthenticated, loading: userLoading, user } = auth
	const { loading, profile, deleted } = profileGet
	if (profile) {
		var userName = profile.user.name
	} else {
		userName = null
	}
	useEffect(() => {
		if (isAuthenticated) {
			dispatch(loadUser())

			dispatch(getProfile())
		}
	}, [dispatch, isAuthenticated])
	useEffect(() => {
		if (deleted) {
			dispatch(getProfile())
			dispatch(setAlert('Removed successfully', 'success'))
		}
	}, [deleted])
	console.log(profile)

	const deleteEduHandler = (e) => {
		dispatch(deleteEducation(e.target.value))
	}
	const deleteExpHandler = (e) => {
		dispatch(deleteExperience(e.target.value))
	}

	return (
		<>
			<h1 className='large text-primary'>Dashboard</h1>
			<p class='lead'>
				<i class='fas fa-user'></i> Welcome {user && user.name}
			</p>
			{userLoading ? (
				<h1>Loading...</h1>
			) : profile === null ? (
				<>
					<p style={{ display: 'inline' }}> No profile created.</p>
					{'   '}
					<Link to='create-profile' className='btn btn-primary '>
						Create profile?
					</Link>
				</>
			) : (
				<>
					<DashProfileActions />
					<p className='lead' style={{ marginTop: '100px' }}>
						Experience
					</p>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Title</th>
								<th>Date</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{profile &&
								profile.experience.map((exp) => (
									<tr id={exp._id}>
										<td>{exp.title}</td>
										<td>
											{<Moment format='YYYY/MM/DD'>{exp.from}</Moment>} {'  '}to
											{'       '}
											{exp.to === null ? (
												'   Now'
											) : (
												<Moment format='YYYY/MM/DD'>{exp.to}</Moment>
											)}
										</td>

										<td>
											<Button
												variant='danger'
												value={exp._id}
												onClick={(e) => deleteExpHandler(e)}
											>
												Delete
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					<p className='lead' style={{ marginTop: '100px' }}>
						Education
					</p>

					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Title</th>
								<th>Date</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{profile &&
								profile.education.map((exp) => (
									<tr id={exp._id}>
										<td>{exp.school}</td>
										<td>
											{<Moment format='YYYY/MM/DD'>{exp.from}</Moment>} {'  '}to
											{'       '}
											{exp.to === null ? (
												'     Now'
											) : (
												<Moment format='YYYY/MM/DD'>{exp.to}</Moment>
											)}
										</td>

										<td>
											<Button
												variant='danger'
												value={exp._id}
												onClick={(e) => deleteEduHandler(e)}
											>
												Delete
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</>
			)}
		</>
	)
}

export default Dashboard
