import './App.css'
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const App = () => {
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
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</section>
		</Router>
	)
}

export default App
