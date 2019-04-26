import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccounts } from '../../actions/accounts';
import Loader from '../loader/Content'
import moment from 'moment';

class List extends Component {
	static propTypes = {
		accounts: PropTypes.array.isRequired,
		getAccounts: PropTypes.func.isRequired
	}
	componentDidMount() {
		setTimeout(_=> {
			this.props.getAccounts()
		}, 2000)
	}		
	onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  addAccount = e => {
  	console.log(e)
  }
  editAccount = e => {
  	console.log(e)
  }
  deleteAccount = e => {
  	console.log(e)
  }  
	render() {
		let accountsList = this.props.accounts.map((account, key) => {
			return (
				<tr key={key}>
					<td>
						<button className="btn btn-outline-primary mx-1" onClick={this.editAccount}>Edit</button>
						<button className="btn btn-outline-danger mx-1" onClick={this.deleteAccount}>Delete</button>
					</td>				
					<td><input type="text" className="form-control-plaintext" value={account.account_number} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.routing_number} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.bank_name} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.bank_nickname} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.bank_address} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.bank_location} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.created_at} onChange={this.onChange} readOnly /></td>
				</tr>
			)
		})
		if(this.props.loaded == true) {
			return (
				<div className="container-fluid">
			    <div class="row">
		        <div class="col-3 px-1 position-fixed" id="sticky-sidebar">
		        	<p>Sidebar</p>
		        </div>
		        <div class="col offset-3" id="main">
		          <h1 className="display-4">Accounts</h1>
							<table className="table">
								<thead>
									<tr>
										<th>Actions</th>
										<th>Account Number</th>
										<th>Routing Number</th>
										<th>Bank Name</th>
										<th>Bank Nickname</th>
										<th>Bank Address</th>
										<th>Bank Location</th>
										<th>Created At</th>
									</tr>
								</thead>
								<tbody>
									{accountsList}
								</tbody>
							</table>
		        </div>
			    </div>				
				</div>
			)
		} else {
			return (
				<div className="container-fluid">
			    <div class="row">
		        <div class="col-3 px-1 position-fixed" id="sticky-sidebar">
		        	<p>Sidebar</p>
		        </div>
		        <div class="col offset-3" id="main">
							<h1 className="display-4">Accounts</h1>
							<Loader />
						</div>
					</div>
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		loaded: state.accounts.loaded,
		accounts: state.accounts.accounts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAccounts: bindActionCreators(getAccounts, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
