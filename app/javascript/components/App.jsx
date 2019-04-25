import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'

export default class App extends Component {
	state = {
		name: ''
	}
	static propTypes = {
		name: PropTypes.string
	}
	onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
	render() {
		const { name } = this.state
		return (
			<Fragment>
				<input type="text" name="name" value={name} onChange={this.onChange} />
				<p>Hello, {this.state.name}</p>
			</Fragment>
		)
	}
}
