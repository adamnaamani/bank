import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../actions/auth';

export class Footer extends Component {
  render() {
  	const { authenticated, user } = this.props.auth
    return (
			<footer className="page-footer bg-white fixed-bottom py-2">
				<div className="footer-copyright text-center text-muted">
					<small className="small">{authenticated ? `Welcome, ${user.email} | ` : ''}© 2019 Copyright: Bank Inc.</small>
				</div>
			</footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
