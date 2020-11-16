import './App.css'
import { useEffect } from 'react'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/authActions'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/Dashboard'
import CreateProfile from './CreateProfile'
import EditProfile from './components/EditProfile'
import AddExperience from './components/AddExperience'
import AddEducation from './components/AddEducation'
import Profiles from './components/Profiles'
import Profile from './components/profile/Profile'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}
const App = ({ history }) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadUser())
	}, [])
	const alerts = useSelector((state) => state.alerts)
	return (
		<Router>
			<Navbar />
			<Route path='/' exact component={Landing} />
			<section className='container'>
				{alerts.map((alert) => (
					<Alert id={alert.id} variant={alert.alertType}>
						{alert.msg}
					</Alert>
				))}
				<Switch>
					<PrivateRoute
						path='/dashboard'
						component={Dashboard}
						history={history}
					/>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/profiles' component={Profiles} />
					<Route path='/profile/:id' component={Profile} />

					<PrivateRoute path='/create-profile' component={CreateProfile} />
					<PrivateRoute path='/edit-profile' component={EditProfile} />
					<PrivateRoute path='/add-experience' component={AddExperience} />
					<PrivateRoute path='/add-education' component={AddEducation} />
				</Switch>
			</section>
		</Router>
	)
}

export default App
