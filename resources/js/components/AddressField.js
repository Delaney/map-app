import React, { Component} from 'react';

export default class AddressField extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div onClick={this.openSelect}>
				{
						this.props.value == ''
						?
						this.props.placeholder
						:
						this.props.value
					}
			</div>

		)
	}

	openSelect = () => {
		this.props.openSelect(this.props.pickupType);
	}

};