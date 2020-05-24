import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(class AddressField extends Component {
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
		this.props.history.replace('/address', { pickupType: this.props.pickup });
	}

});