import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends Component {
  render() {
  	let { authenticated } = this.props.auth
		let userLinks = (
			<>
				<Link to="/new" className="nav-link text-primary">New Account</Link>
				<Link to="/" className="nav-link">Accounts</Link>
				<Nav.Link href="/dashboard">Dashboard</Nav.Link>
	      <Nav.Link href="/users/sign_out">Logout</Nav.Link>
      </>
		)
		let guestLinks = (
			<>
	      <Nav.Link href="/users/sign_in">Login</Nav.Link>
	      <Nav.Link href="/users/sign_up">Register</Nav.Link>
      </>
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

const mapStateToProps = (state) => ({
	auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
	getUser: bindActionCreators(getUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
