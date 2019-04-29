import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getInstitutions } from '../../actions/institutions';
import { addAccount } from '../../actions/accounts';

class Form extends Component {
	static propTypes = {
		addAccount: PropTypes.func.isRequired,
		getInstitutions: PropTypes.func.isRequired
	}	
	constructor(props) {
		super(props)
		this.initialState = {
			readOnly: true, disabled: false, validated: false,
			routingNumberError: false, accountNumberError: false, bankNameError: false, bankAddressError: false, bankLocationError: false,
			account_number: '', routing_number: '', bank_name: '', bank_address: '', bank_location: '',
			errors: [], institutions: []
    };
    this.state = this.initialState;
  }
	componentDidUpdate(prevProps, prevState) {
	  if(prevProps.institutions !== this.props.institutions) {
	  	this.setState(this.props.institutions);
	  }
	}	  
	onChange = e => {
		return new Promise(resolve => {
	    this.setState({ [e.target.name]: e.target.value }, _=> {
	  		resolve();		
			});
		})		
  }
  getInstitutions = e => {
  	this.setState({			
  		bank_name: '',
			bank_address: '',
			bank_location: ''
		});

  	this.onChange(e).then(_=> {  		
	  	this.props.getInstitutions(this.state);
  	});
  }  
	validateForm = e => {
		this.setState({
			routingNumberError: false,
			accountNumberError: false,
			bankNameError: false,
			bankAddressError: false,
			bankLocationError: false,			
		})

		return new Promise(resolve => {
			if(!this.state.routing_number || this.state.routing_number.length != 9) {
				(this.state.routing_number.length == 9) ? this.setState({routingNumberError: false}) : this.setState({routingNumberError: true});
				if(!this.state.account_number) {
					this.setState({accountNumberError: true});	
				}
			} 
			else if(!this.state.account_number || this.state.account_number.length > 10) {
				this.setState({accountNumberError: true});
			}
			else if(!this.state.bank_name || !this.state.bank_address || !this.state.bank_location) {
				this.setState({routingNumberError: true});
			} 
			else {
				resolve();
				this.setState({validated: true, routingNumberError: false, accountNumberError: false});
			}
		})
	}
	submitForm = e => {
		this.validateForm().then(_=> {
			if(this.state.validated == true) {
				this.setState({disabled: true});
				this.props.addAccount(this.state);
				
				setTimeout(_=> {
					if(!this.props.errors.errors) {
						window.location.href = '/';
					}
					else {
						this.setState({disabled: false});
						for(let error in this.props.errors.errors) {
							switch(error) {
								case 'routing_number':
									this.setState({routingNumberError: true});
									alert('Invalid routing number.');
								case 'account_number':
									this.setState({accountNumberError: true});
									alert('Account number already taken.');
							}
						}
					}
				}, 1500)
			}
		})
	}
  render() {
  	const { 
  		disabled, 
  		account_number, 
  		routing_number, 
  		bank_name, 
  		bank_address, 
  		bank_location, 
  		validated, 
  		routingNumberError, 
  		accountNumberError,
  		bankNameError,
  		bankAddressError,
  		bankLocationError
  	} = this.state;

    return (
			<form>
				<h1 className="display-4 mb-4">New Account</h1>
			  <div className="form-group row">
			    <label htmlFor="routing-number" className="col-sm-2 col-form-label">Routing Number</label>
			    <div className="col-sm-10">
			    	<input 
			    	type="number"
			    	max={9} 
			    	className={"form-control " + (routingNumberError ? 'is-invalid' : '')} 
			    	id="routing-number"  
			    	name="routing_number" 
			    	value={routing_number || ''} 
			    	onChange={this.getInstitutions.bind(this)} 
			    	required 
			    	/>
			    	<small id="routing-help" className={"small form-text mt-2 " + (routingNumberError ? 'text-danger' : 'text-muted')}>Must be a valid 9 digit number, e.g. 121143260.</small>
			    </div>
			  </div>				
			  <div className="form-group row">
			    <label htmlFor="account-number" className="col-sm-2 col-form-label">Account Number</label>
			    <div className="col-sm-10">
			    	<input 
			    	type="number"
			    	max={10} 
			    	className={"form-control " + (accountNumberError ? 'is-invalid' : '')}  
			    	id="account-number" 
			    	name="account_number" 
			    	value={account_number || ''} 
			    	onChange={this.onChange} 
			    	required 
			    	/>
			    	<small id="account-help" className={"small form-text mt-2 " + (accountNumberError ? 'text-danger' : 'text-muted')}>Max 10 digits, e.g. 0123456789.</small>
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-name" className="col-sm-2 col-form-label">Bank Name</label>
			    <div className="col-sm-10">
			    	<input 
			    	type="text" 
			    	className={"form-control " + (bankNameError ? 'is-invalid' : '')}  
			    	id="bank-name" 
			    	name="bank_name" 
			    	value={bank_name || ''} 
			    	onChange={this.onChange} 
			    	readOnly={this.state.readOnly} 
			    	/>
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-address" className="col-sm-2 col-form-label">Bank Address</label>
			    <div className="col-sm-10">
			    	<input 
			    	type="text" 
			    	className={"form-control " + (bankAddressError ? 'is-invalid' : '')}  
			    	id="bank-address" 
			    	name="bank_address" 
			    	value={bank_address || ''} 
			    	onChange={this.onChange} 
			    	readOnly 
			    	/>
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-location" className="col-sm-2 col-form-label">Bank Location</label>
			    <div className="col-sm-10">
			    	<input 
			    	type="text" 
			    	className={"form-control " + (bankLocationError ? 'is-invalid' : '')}  
			    	id="bank-location" 
			    	placeholder="" 
			    	name="bank_location" 
			    	value={bank_location || ''} 
			    	onChange={this.onChange} 
			    	readOnly 
			    	/>
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-location" className="col-sm-2 col-form-label"></label>
			    <div className="col-sm-10">
						<button className="btn btn-block btn-primary" type="button" onClick={this.submitForm} disabled={disabled}>
						  {disabled ? <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> : 'Save' } 
						</button>			    	
			    </div>
			  </div>			  			  			  
			</form>
    )
  }
}

function mapStateToProps(state) {
	return {
		loaded: state.institutions.loaded,
		institutions: state.institutions.institutions,
		errors: state.accounts.errors
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getInstitutions: bindActionCreators(getInstitutions, dispatch),
		addAccount: bindActionCreators(addAccount, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
