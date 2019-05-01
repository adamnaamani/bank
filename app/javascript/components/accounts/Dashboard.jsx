import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccounts } from '../../actions/accounts';
import Map from '../geo/Map'

class Dashboard extends Component {
	static propTypes = {
		accounts: PropTypes.array,
		getAccounts: PropTypes.func.isRequired
	}	
	constructor(props) {
		super(props)
		this.initialState = {
			accounts: []
    };
    this.state = this.initialState;
  }
  componentDidMount() {
  	this.props.getAccounts();	
  }
  componentDidUpdate(prevProps, prevState) {
	  if(prevProps.accounts !== this.props.accounts) {
	    this.setState({accounts: this.props.accounts}); 	    
	  }	    	
  }
  render() {
  	return (
  		<Fragment>
  			<Map />
  		</Fragment>
  	)
  }
}

function mapStateToProps(state) {
	return {
		accounts: state.accounts.accounts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAccounts: bindActionCreators(getAccounts, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
