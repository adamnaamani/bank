import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { getUser } from '../actions/auth';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import store from '../store'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Layout.scss';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import List from '../components/accounts/List';
import Form from '../components/accounts/Form';
import Dashboard from '../components/accounts/Dashboard';

axios.defaults.headers.common['X-CSRF-Token'] = document.getElementsByName('csrf-token')[0].getAttribute('content');
axios.defaults.headers.common['Accept'] = 'application/json';

class App extends Component {
	componentDidMount() {
		setTimeout(_=> {
			document.body.style.display = 'block';
		}, 300)
		let loggedOutPaths = ['/users/sign_in', '/users/sign_up', '/users/password/new']
		loggedOutPaths.includes(window.location.pathname) ? null : store.dispatch(getUser());
	}
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Header />
					<Switch>
						<Fragment>
							<div className="container py-4 mb-5">
								<Route exact path="/" component={List} />
								<Route exact path="/new" component={Form} />
								<Route exact path="/dashboard" component={Dashboard} />
							</div>
						</Fragment>					
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
