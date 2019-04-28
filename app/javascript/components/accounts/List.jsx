import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccounts, updateAccount, deleteAccount } from '../../actions/accounts';
import Loader from '../loader/Content';
import moment from 'moment';
import $ from 'jquery';

class List extends Component {
	static propTypes = {
		accounts: PropTypes.array.isRequired,
		getAccounts: PropTypes.func.isRequired,
		updateAccount: PropTypes.func.isRequired,
		deleteAccount: PropTypes.func.isRequired		
	}
	constructor(props) {
		super(props)
    this.state = {
			search: '',
			readOnly: false,
			accounts: []			
		}
  }	
	componentDidMount() {
		setTimeout(_=> {
			this.props.getAccounts()
		}, 1000)
	}		
	onChange = e => {
		return new Promise(resolve => {
			this.setState({ [e.target.name]: e.target.value }, _=> {
				resolve()
			})
		})
  }
  editInputs = e => {
  	this.setState(prevState => ({ readOnly: !prevState.readOnly }));
  	$('input.form-control-plaintext').toggleClass('form-control', this.state.readOnly );  	
  }
  updateAccount = (id, e) => {
  	this.onChange(e).then(_=> {
  		this.props.updateAccount(id)
  	})
  }
  deleteAccount = e => {
  	if(window.confirm('Are you sure you want to delete this account?')) {
  		this.props.deleteAccount(e) 
  	}
  }  
	filterAccounts = e => {
		this.onChange(e).then(_=> {
			console.log(this.state)
		})    
	}    
	render() {
		let { search } = this.state
		let noAccounts = (
			<tr>
				<td colSpan={7} className="text-center py-5"><Link to="/new" className="btn btn-outline-primary">Create An Account</Link></td>
			</tr>
		)
		if(this.props.loaded == true) {
			let accountsList = this.props.accounts.map((account, key) => {
				let created = `${moment(account.created_at).format('MM/DD/YYYY')}`
				return (
					<tr key={key}>
						<td><button className="btn" onClick={this.deleteAccount.bind(this, account.id)}><i className="far fa-trash-alt"></i></button></td>				
						<td><input type="text" className="form-control-plaintext" value={account.account_number || ''} onChange={this.updateAccount.bind(this, account.id)} readOnly={this.state.readOnly} /></td>
						<td><input type="text" className="form-control-plaintext" value={account.routing_number || ''} onChange={this.updateAccount.bind(this, account.id)} maxLength="9" readOnly={this.state.readOnly} /></td>
						<td><input type="text" className="form-control-plaintext" value={account.bank_name || ''} onChange={this.updateAccount.bind(this, account.id)} readOnly={this.state.readOnly} /></td>
						<td><input type="text" className="form-control-plaintext" value={account.bank_address || ''} onChange={this.updateAccount.bind(this, account.id)} readOnly={this.state.readOnly} /></td>
						<td><input type="text" className="form-control-plaintext" value={account.bank_location || ''} onChange={this.updateAccount.bind(this, account.id)} readOnly={this.state.readOnly} /></td>
						<td><input type="text" className="form-control-plaintext" value={created} onChange={this.updateAccount.bind(this, account.id)} readOnly={this.state.readOnly} /></td>
					</tr>
				)
			})			
			return (
				<Fragment>
					<h1 className="display-4 mb-4">Accounts</h1>
					<div className="input-group p-1 mb-4">
					  <input type="text" className="form-control" placeholder="Search for anything..." name="search" value={search} onChange={this.filterAccounts} />
					</div>
					<div className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<th>Actions</th>
									<th>Account Number</th>
									<th>Routing Number</th>
									<th>Bank Name</th>
									<th>Bank Address</th>
									<th>Bank Location</th>
									<th>Created</th>
								</tr>
							</thead>
							<tbody>
								{accountsList.length ? accountsList : noAccounts}
							</tbody>
						</table>
					</div>
				</Fragment>
			)
		} else {
			return (
				<Loader />
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
		getAccounts: bindActionCreators(getAccounts, dispatch),
		updateAccount: bindActionCreators(updateAccount, dispatch),
		deleteAccount: bindActionCreators(deleteAccount, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
