import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInstitutions } from '../../actions/institutions';
import { addAccount } from '../../actions/accounts';

class Form extends Component {
	static propTypes = {
		getInstitutions: PropTypes.func.isRequired
	}	
	constructor(props) {
		super(props)
		this.initialState = {
			disabled: false,
			readOnly: true,
			account_number: '',
			routing_number: '',
			bank_name: '',
			bank_address: '',
			bank_location: ''
    };
    this.state = this.initialState;
  }
  componentDidMount() {
  }
	onChange = e => {
		return new Promise(resolve => {
	    this.setState({ [e.target.name]: e.target.value }, _=> {
	  		resolve();
			});
		})
  }
  getInstitutions = e => {
  	this.setState({...this.initialState});
  	this.onChange(e).then(_=> {  		
	  	this.props.getInstitutions(this.state);
	  	setTimeout(_=> {
	  		this.setState(this.props.institutions);
	  	}, 100)
  	});
  }  
	validateForm = e => {
		e.preventDefault();
		this.setState({disabled: true});
		
		this.submitForm();
	}
	submitForm = e => {
		this.props.addAccount(this.state)
		setTimeout(_=> {
			window.location.href = '/'
		}, 1000)
	}
  render() {
  	const { disabled, account_number, routing_number, bank_name, bank_address, bank_location } = this.state;
    return (
			<form>
				<h1 className="display-4 mb-4">New Account</h1>
			  <div className="form-group row">
			    <label htmlFor="routing-number" className="col-sm-2 col-form-label">Routing Number</label>
			    <div className="col-sm-10">
			    	<input type="text" maxLength={9} className="form-control" id="routing-number" placeholder="" name="routing_number" value={routing_number || ''} onChange={this.getInstitutions} />
			    	<small id="routing-help" className="small form-text text-muted mt-2">Must be a 9 digit number, e.g. 121143260.</small>
			    </div>
			  </div>				
			  <div className="form-group row">
			    <label htmlFor="account-number" className="col-sm-2 col-form-label">Account Number</label>
			    <div className="col-sm-10">
			    	<input type="text" maxLength={10} className="form-control" id="account-number" placeholder="" name="account_number" value={account_number || ''} onChange={this.onChange} />
			    	<small id="routing-help" className="small form-text text-muted mt-2">Max 10 digits.</small>
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-name" className="col-sm-2 col-form-label">Bank Name</label>
			    <div className="col-sm-10">
			    	<input type="text" className="form-control" id="bank-name" placeholder="" name="bank_name" value={bank_name || ''} onChange={this.onChange} readOnly={this.state.readOnly} />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-address" className="col-sm-2 col-form-label">Bank Address</label>
			    <div className="col-sm-10">
			    	<input type="text" className="form-control" id="bank-address" placeholder="" name="bank_address" value={bank_address || ''} onChange={this.onChange} readOnly />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-location" className="col-sm-2 col-form-label">Bank Location</label>
			    <div className="col-sm-10">
			    	<input type="text" className="form-control" id="bank-location" placeholder="" name="bank_location" value={bank_location || ''} onChange={this.onChange} readOnly />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-location" className="col-sm-2 col-form-label"></label>
			    <div className="col-sm-10">
						<button className="btn btn-block btn-primary" type="button" onClick={this.validateForm} disabled={disabled}>
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
		institutions: state.institutions.institutions
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getInstitutions: bindActionCreators(getInstitutions, dispatch),
		addAccount: bindActionCreators(addAccount, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
