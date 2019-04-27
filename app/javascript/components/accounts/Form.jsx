import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Form extends Component {
	validate() {
	}
  render() {
    return (
			<form>
			  <div className="form-group row">
			    <label htmlFor="account-number" className="col-sm-2 col-form-label">Account Number</label>
			    <div className="col-sm-10">
			    	<input type="number" className="form-control" id="account-number" placeholder="e.g. 1234567890" />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="routing-number" className="col-sm-2 col-form-label">Routing Number</label>
			    <div className="col-sm-10">
			    	<input type="text" className="form-control" id="routing-number" placeholder="e.g. 123456789" maxLength={9} />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-name" className="col-sm-2 col-form-label">Bank Name</label>
			    <div className="col-sm-10">
			    	<input type="text" className="form-control" id="bank-name" placeholder="" />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-nickname" className="col-sm-2 col-form-label">Bank Nickname</label>
			    <div className="col-sm-10">
			    	<input type="text" className="form-control" id="bank-nickname" placeholder="" />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-address" className="col-sm-2 col-form-label">Bank Address</label>
			    <div className="col-sm-10">
			    	<input type="text" className="form-control" id="bank-address" placeholder="" />
			    </div>
			  </div>
			  <div className="form-group row">
			    <label htmlFor="bank-location" className="col-sm-2 col-form-label">Bank Location</label>
			    <div className="col-sm-10">
			    	<input type="text" className="form-control" id="bank-location" placeholder="" />
			    </div>
			  </div>			  			  
			</form>
    )
  }
}

export default connect()(Form);
