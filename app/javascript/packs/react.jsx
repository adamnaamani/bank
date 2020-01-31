import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getUser } from '../actions/auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import store from '../store'; 
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import List from '../components/accounts/List';
import Form from '../components/accounts/Form';
import Dashboard from '../components/accounts/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Layout.scss';

axios.defaults.headers.common['X-CSRF-Token'] = document.getElementsByName('csrf-token')[0].getAttribute('content');
axios.defaults.headers.common['Accept'] = 'application/json';

class App extends Component {
	componentDidMount() {
		setTimeout(() => {
			document.body.style.visibility = 'visible';
		}, 500)
		let loggedOutPaths = ['/users/sign_in', '/users/sign_up', '/users/password/new']
		loggedOutPaths.includes(window.location.pathname) ? null : store.dispatch(getUser());
	}
	
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Header />
					<Switch>
						<div className="container py-4 mb-5">
							<Route exact path="/" component={List} />
							<Route exact path="/new" component={Form} />
							<Route exact path="/dashboard" component={Dashboard} />
						</div>
					</Switch>
					<Footer />
				</Router>
			</Provider>
		)
	}
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')));
})
