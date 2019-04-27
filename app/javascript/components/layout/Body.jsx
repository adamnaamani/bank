import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '../accounts/List';
import Form from '../accounts/Form';

export class Body extends Component {
  render() {
    return (
			<div className="container-fluid p-4">
				<h1 className="display-4 mb-4">Accounts</h1>
				<div className="table-responsive">
					<List />
				</div>
			</div>
    )
  }
}

export default connect()(Body);
