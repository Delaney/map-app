import React, { Component } from 'react';
import Select from 'react-select';

const original = [
	{ value: ''}
]

class AddressInput extends Component {
	constructor(props) {
		super(props);


	}

	render() {

		return (
			<Select
				value={}
				onChange={this.handleChange}
				options={options}
			/>
		)
	}
}