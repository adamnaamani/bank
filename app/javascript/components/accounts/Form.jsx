import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInstitutions } from '../../actions/institutions';

class Form extends Component {
	static propTypes = {
		getInstitutions: PropTypes.func.isRequired
	}	
	constructor(props) {
		super(props)
    this.state = {
			account_number: '',
			routing_number: '',
			bank_name: '',
			bank_nickname: '',
			bank_address: '',
			bank_location: ''
		}
  }
  componentDidMount() {
  }
	onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, _=> {
  		this.getInstitutions();
		});
  }
  getInstitutions = e => {
    let account = this.state;

  	this.props.getInstitutions(account);

  	setTimeout(_=> {
  		this.setState(this.props.institutions)
  	}, 300)
  }  
	validateForm = e => {
		e.preventDefault();
		this.submitForm();
	}
	submitForm = e => {
	}
  render() {
  	const { account_number, routing_number, bank_name, bank_nickname, bank_address, bank_location } = this.state;
    return (
			<form>
				<h1 className="display-4 mb-4">New Account</h1>
			  <div className="form-group row">
			    <label htmlFor="account-number" className="col-sm-2 col-form-label">Account Number</label>
			    <div className="col-sm-10 px-4">
			    	<input type="number" className="form-control" id="account-number" placeholder="e.g. 1234567890" name="account_number" value={account_number || ''} onChange={this.onChange} />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="routing-number" className="col-sm-2 col-form-label">Routing Number</label>
			    <div className="col-sm-10 px-4">
			    	<input type="text" maxLength={9} className="form-control" id="routing-number" placeholder="e.g. 123456789" name="routing_number" value={routing_number || ''} onChange={this.onChange} />
			    	<small id="routing-help" className="small form-text text-muted mt-2">Must be a 9 digit number.</small>
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-name" className="col-sm-2 col-form-label">Bank Name</label>
			    <div className="col-sm-10 px-4">
			    	<input type="text" className="form-control" id="bank-name" placeholder="" name="bank_name" value={bank_name || ''} onChange={this.onChange} />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-nickname" className="col-sm-2 col-form-label">Bank Nickname</label>
			    <div className="col-sm-10 px-4">
			    	<input type="text" className="form-control" id="bank-nickname" placeholder="" name="bank_nickname" value={bank_nickname || ''} onChange={this.onChange} />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-address" className="col-sm-2 col-form-label">Bank Address</label>
			    <div className="col-sm-10 px-4">
			    	<input type="text" className="form-control" id="bank-address" placeholder="" name="bank_address" value={bank_address || ''} onChange={this.onChange} />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-location" className="col-sm-2 col-form-label">Bank Location</label>
			    <div className="col-sm-10 px-4">
			    	<input type="text" className="form-control" id="bank-location" placeholder="" name="bank_location" value={bank_location || ''} onChange={this.onChange} />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-location" className="col-sm-2 col-form-label"></label>
			    <div className="col-sm-10 px-4">
			    	<input type="submit" className="btn btn-block btn-primary" value="Save" onClick={this.validateForm} />
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
		getInstitutions: bindActionCreators(getInstitutions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
