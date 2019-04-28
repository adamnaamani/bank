import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import store from '../store';
import { getUser } from '../actions/auth'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Layout.scss';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Dashboard from '../components/accounts/Dashboard';
import List from '../components/accounts/List';
import Form from '../components/accounts/Form';

axios.defaults.headers.common['X-CSRF-Token'] = document.getElementsByName('csrf-token')[0].getAttribute('content');
axios.defaults.headers.common['Accept'] = 'application/json';

class App extends Component {
	componentDidMount() {
		store.dispatch(getUser());
		setTimeout(_=> {
			document.body.style.display = 'block';
		}, 300)
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
								<Route exact path="/dashboard" component={Dashboard} />
								<Route exact path="/new" component={Form} />
							</div>
						</Fragment>					
					</Switch>
				</Router>
			</Provider>
		)
	}
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')));
})
