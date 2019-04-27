import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export class Header extends Component {
  render() {
    return (
			<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
			  <Navbar.Brand href="/">
       		<img src="/android-chrome-192x192.png" style={{width: 20, height: 20}} />
       		<img src="/bank-logo.png" style={{height: 12, width: 'auto'}} />
			  </Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  <Navbar.Collapse id="responsive-navbar-nav">
			    <Nav className="mr-auto">
			      <Nav.Link href="/">Accounts</Nav.Link>
			    </Nav>
			    <Nav>
			      <Nav.Link href="/login">Login</Nav.Link>
			      <Nav.Link href="/register">Register</Nav.Link>
			      <Link to="/new" className="btn btn-primary nav-link text-white">New Account</Link>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
    )
  }
}

export default connect()(Header);
