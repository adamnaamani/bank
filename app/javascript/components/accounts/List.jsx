import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAccounts, updateAccount, deleteAccount } from '../../actions/accounts';
import Loader from '../loader/Content';
import moment from 'moment';

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
			accounts: this.props.accounts || []			
		}
		this.onChange = this.onChange.bind(this);
  }	
	componentDidMount() {
		setTimeout(_=> {
			this.props.getAccounts()
		}, 1000)
	}
	componentDidUpdate(prevProps, prevState) {
	  if(prevProps.accounts !== this.props.accounts) {
	    this.setState({accounts: this.props.accounts}) 
	  }
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
  updateAccount = (account, e) => {
  	e.persist();
		this.setState(prevState => ({
		  accounts: prevState.accounts.map(obj => (obj.id === account.id ? Object.assign(obj, {[e.target.name]: e.target.value }) : obj))
		}), _=> {
			let accountDetails = this.state.accounts.find(obj => obj.id === account.id)
			this.props.updateAccount(accountDetails)
		});
  }
  deleteAccount = e => {
  	if(window.confirm('Are you sure you want to delete this account?')) {
  		this.props.deleteAccount(e) 
  	}
  }  
	filterAccounts = e => {
		this.onChange(e).then(_=> {
			const { accounts } = this.props;
			const direction = 'asc';
			const category = 'routing_number';

			let filteredAccounts = accounts.filter((item, index) => {
      	let items = [item.account_number, item.routing_number, item.bank_name, item.bank_address, item.bank_location, item.created_at].join(' ').toLowerCase()
      	return items.indexOf(this.state.search.toLowerCase()) >= 0
      }).sort((a,b) => {
	      let modifier = 1
	      if(direction === 'desc') modifier = -1
	      if(!isNaN(a[category])) {
		      if(parseInt(a[category]) < parseInt(b[category])) return -1 * modifier
		      if(parseInt(a[category]) > parseInt(b[category])) return 1 * modifier					
	      } else {
		      if(a[category] < b[category]) return -1 * modifier
		      if(a[category] > b[category]) return 1 * modifier	      	
	      }
	      return 0
	    })
	    this.setState({accounts: filteredAccounts}) 
		})    
	}    
	render() {
		let { search, accounts } = this.state
  	let { saved } = this.props
  	let savedNotification = (
  		<p className="text-success small align-middle">Saved!</p>
  	)		
		let noAccounts = (
			<tr><td colSpan={7} className="text-center py-5"><Link to="/new" className="btn btn-outline-primary">Create An Account</Link></td></tr>
		)		
		let accountsList = accounts.map((account, key) => {
			return (
				<tr key={key}>
					<td><button className="btn" onClick={this.deleteAccount.bind(this, account.id)}><i className="far fa-trash-alt"></i></button></td>				
					<td><input type="text" className="form-control-plaintext text-truncate" name="account_number" value={account.account_number || ''} onChange={this.updateAccount.bind(this, account)} readOnly={this.state.readOnly} /></td>
					<td><input type="text" className="form-control-plaintext text-truncate" name="routing_number" value={account.routing_number || ''} onChange={this.updateAccount.bind(this, account)} maxLength="9" readOnly={this.state.readOnly} /></td>
					<td><input type="text" className="form-control-plaintext text-truncate" name="bank_name" value={account.bank_name || ''} onChange={this.updateAccount.bind(this, account)} readOnly={this.state.readOnly} /></td>
					<td><input type="text" className="form-control-plaintext text-truncate" name="bank_nickname" value={account.bank_nickname || ''} onChange={this.updateAccount.bind(this, account)} readOnly={this.state.readOnly} /></td>
					<td><input type="text" className="form-control-plaintext text-truncate" name="bank_address" value={account.bank_address || ''} onChange={this.updateAccount.bind(this, account)} readOnly={this.state.readOnly} /></td>
					<td><input type="text" className="form-control-plaintext text-truncate" name="bank_location" value={account.bank_location || ''} onChange={this.updateAccount.bind(this, account)} readOnly={this.state.readOnly} /></td>
					<td><input type="text" className="form-control-plaintext text-truncate" name="created_at" value={`${moment(account.created_at).format('MM/DD/YYYY')}`} onChange={this.updateAccount.bind(this, account)} readOnly={this.state.readOnly} /></td>
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
					{this.props.loaded == false ? (<Loader />) : (
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
									<th>Created</th>
								</tr>
							</thead>
							<tbody>
								{accountsList.length ? accountsList : noAccounts}
							</tbody>
						</table>
					)}
				</div>
			</Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		loaded: state.accounts.loaded,
		accounts: state.accounts.accounts,
		saved: state.accounts.saved
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
