import React, { Component} from 'react';

export default class AddressField extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const hidden = { display: 'none' };
		return (
			// <div className="fieldContainer" style={hidden}>
				// <div className="fieldDiv flex-center">
				// 	<input
				// 		type='text'
				// 		placeholder="Pickup Address"
				// 		name='pickup'
				// 		id='pickup-input'
				// 		value={this.state.pickup}
				// 		onChange={this.updateField}
				// 	/>
				// 	<div
				// 		className="setCurrentLocation"
				// 		data-name="pickup"
				// 		onClick={this.setCurrentAsPickup}
				// 	></div>
						
				// </div>

			// 	<div className="fieldDiv flex-center">
			// 		<input
			// 			type='text'
			// 			placeholder="Dropoff Address"
			// 			name='dropoff'
			// 			value={this.state.dropoff}
			// 			onChange={this.updateField}
			// 		/>
			// 		<div
			// 			className="setCurrentLocation"
			// 			data-name="dropoff"
			// 			onClick={this.setCurrentAsPickup}
			// 		></div>
			// 	</div>
			// </div>

			// <div className="fieldContainer">
			// 	<div className="fieldDiv flex-center">
			// 		<input
			// 			type='text'
			// 			placeholder="Pickup Address"
			// 			name='pickup'
			// 			onClick={this.openSelect}
			// 		/>	
			// 	</div>

			// 	<div className="fieldDiv flex-center">
			// 		<input
			// 			type='text'
			// 			placeholder="Dropoff Address"
			// 			name='dropoff'
			// 			onClick={this.openSelect}
			// 		/>
			// 	</div>
			// </div>

			// <input
			// 	type='text'
			// 	placeholder="Pickup Address"
			// 	name='pickup'
			// 	onClick={this.openSelect}
			// />

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
		this.props.openSelect();
	}

}