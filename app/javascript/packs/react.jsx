import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import store from '../store';
import { getUser } from '../actions/auth';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Layout.scss';

import Header from '../components/layout/Header'
import List from '../components/accounts/List'
import Form from '../components/accounts/Form'

class App extends Component {
	componentDidMount() {
		store.dispatch(getUser())
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
							<div className="container-fluid p-4">
								<div className="table-responsive">
									<Route exact path="/" component={List} />				
									<Route exact path="/new" component={Form} />
								</div>
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
