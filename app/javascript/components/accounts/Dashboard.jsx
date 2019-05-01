import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccounts } from '../../actions/accounts';
import { getCoordinates } from '../../actions/geo';
import Map from '../geo/Map'

class Dashboard extends Component {
	static propTypes = {
		accounts: PropTypes.array,
		coordinates: PropTypes.array,
		getAccounts: PropTypes.func.isRequired,		
		getCoordinates: PropTypes.func.isRequired		
	}	
	constructor(props) {
		super(props)
		this.initialState = {
			accounts: this.props.accounts || [],
			coordinates: this.props.coordinates || []
    };
    this.state = this.initialState;
  }
  componentDidMount() {
  	this.props.getAccounts().then(_=> {
			this.props.accounts.forEach(account => {
				this.props.getCoordinates(account, [account.bank_address, account.bank_location].join(', '));
			})  		
  	});	
  }
  componentDidUpdate(prevProps, prevState) {
	  if(prevProps.accounts !== this.props.accounts) {
	    this.setState({accounts: this.props.accounts}); 	    
	  }
	  if(prevProps.coordinates !== this.props.coordinates) {
	    this.setState({coordinates: this.props.coordinates});
	  }	  	    	
  }
  render() {
  	return (
  		<Fragment>
  			<Map accounts={this.state.accounts} coordinates={this.state.coordinates} />
  		</Fragment>
  	)
  }
}

function mapStateToProps(state) {
	return {
		accounts: state.accounts.accounts,
		coordinates: state.geo.coordinates
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAccounts: bindActionCreators(getAccounts, dispatch),
		getCoordinates: bindActionCreators(getCoordinates, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
