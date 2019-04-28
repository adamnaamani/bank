import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {
	static propTypes = {
	}	
	constructor(props) {
		super(props)
		this.initialState = {
    };
    this.state = this.initialState;
  }
  render() {
  	return (
  		<Fragment>
  		</Fragment>
  	)
  }
}

function mapStateToProps(state) {
	return {
	}
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
