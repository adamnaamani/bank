import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/auth';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class Header extends Component {
	componentDidUpdate() {
	}
  render() {
  	let { authenticated, user } = this.props.auth
		let userLinks = (
			<Fragment>
				<Link to="/new" className="nav-link text-primary">New Account</Link>
				<Link to="/" className="nav-link">Accounts</Link>
	      <Nav.Link href="/users/sign_out">Logout</Nav.Link>
      </Fragment>
		)
		let guestLinks = (
			<Fragment>
	      <Nav.Link href="/users/sign_in">Login</Nav.Link>
	      <Nav.Link href="/users/sign_up">Register</Nav.Link>
      </Fragment>
		)
    return (
			<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			  <Navbar.Brand href="/">
       		<img src="/android-chrome-192x192.png" style={{width: 20, height: 20}} />
       		<img src="/bank-logo.png" style={{height: 12, width: 'auto'}} />
			  </Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  <Navbar.Collapse id="responsive-navbar-nav">
			  	<Nav className="mr-auto"/>
			    <Nav>
			    	{authenticated ? userLinks : guestLinks}
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
    )
  }
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getUser: bindActionCreators(getUser, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
