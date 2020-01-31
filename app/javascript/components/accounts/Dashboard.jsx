import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccounts } from '../../actions/accounts';
import { getCoordinates } from '../../actions/geo';
import Map from '../geo/Map';

class Dashboard extends Component {
	static propTypes = {
		accounts: PropTypes.array,
		coordinates: PropTypes.array,
		getAccounts: PropTypes.func.isRequired,		
		getCoordinates: PropTypes.func.isRequired		
	}
	
	state = {
		accounts: this.props.accounts || [],
		coordinates: this.props.coordinates || []
	}
	
	componentDidMount() {
  	this.props.getAccounts().then(() => {
			this.props.accounts.forEach(account => {
				this.props.getCoordinates(account, [account.bank_address, account.bank_location].join(', '));
			})  		
  	});	
  }
	
	componentDidUpdate(prevProps) {
	  if(prevProps.accounts !== this.props.accounts) {
	    this.setState({accounts: this.props.accounts}); 	    
	  }
	  if(prevProps.coordinates !== this.props.coordinates) {
	    this.setState({coordinates: this.props.coordinates});
	  }	  	    	
  }
	
	render() {
  	return (
			<Map accounts={this.state.accounts} coordinates={this.state.coordinates} />
  	)
  }
}

const mapStateToProps = (state) => ({
	accounts: state.accounts.accounts,
	coordinates: state.geo.coordinates
})

const mapDispatchToProps = (dispatch) => ({
	getAccounts: bindActionCreators(getAccounts, dispatch),
	getCoordinates: bindActionCreators(getCoordinates, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
