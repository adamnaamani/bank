import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccounts } from '../../actions/accounts';
import Loader from '../loader/Content'

class List extends Component {
	static propTypes = {
		accounts: PropTypes.array.isRequired,
		getAccounts: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
    this.state = {
			search: ''
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
  addAccount = e => {
  }
  editAccount = e => {
  }
  deleteAccount = e => {
  }
	filterAccounts = e => {
		this.onChange(e).then(_=> {
			console.log(this.state)
		})    
	}    
	render() {
		let { search } = this.state
		let accountsList = this.props.accounts.map((account, key) => {
			return (
				<tr key={key}>
					<td>
						<button className="btn btn-outline-primary mx-1" onClick={this.editAccount}>Edit</button>
						<button className="btn btn-outline-danger mx-1" onClick={this.deleteAccount}>Delete</button>
					</td>				
					<td><input type="text" className="form-control-plaintext" value={account.account_number || ''} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.routing_number || ''} onChange={this.onChange} maxLength="9" readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.bank_name || ''} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.bank_address || ''} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.bank_location || ''} onChange={this.onChange} readOnly /></td>
					<td><input type="text" className="form-control-plaintext" value={account.created_at || ''} onChange={this.onChange} readOnly /></td>
				</tr>
			)
		})
		let noAccounts = (
			<tr>
				<td colSpan={7} className="text-center py-5"><Link to="/new" className="btn btn-outline-primary">Create An Account</Link></td>
			</tr>
		)
		if(this.props.loaded == true) {
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
									<th>Created At</th>
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
		getAccounts: bindActionCreators(getAccounts, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
