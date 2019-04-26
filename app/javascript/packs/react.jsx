import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import store from '../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Layout.scss';
import Header from '../components/layout/Header'
import List from '../components/accounts/List'

class App extends Component {
	componentDidMount() {
		setTimeout(_=> {
			document.body.style.display = 'block';
		}, 500)
	}
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Header />
					<Switch>
						<Route exact path="/" component={List} />
					</Switch>
				</Router>
			</Provider>
		)
	}
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')));
})
