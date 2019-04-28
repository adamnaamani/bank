import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Footer extends Component {
  render() {
    return (
			<footer className="page-footer bg-white">
				<div className="footer-copyright text-center text-muted">
					<hr></hr>
					<small className="small">© 2019 Copyright: Bank Inc.</small>
				</div>
			</footer>
    )
  }
}

export default connect()(Footer);
