import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Header extends Component {
  render() {
    const guestLinks = (
      <ul className="navbar-nav ml-md-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">Accounts</Link>
        </li>
      </ul>      
    )
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
       	<a className="navbar-brand"><img src="/android-chrome-192x192.png" style={{width: 20, height: 20}} /></a><a className="navbar-brand" href="/">Bank</a>
        <div className="navbar-collapse" id="navbarSupportedContent">
          {guestLinks}
        </div>
      </nav>
    )
  }
}

export default connect()(Header);
