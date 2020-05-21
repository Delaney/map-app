import React, { Component} from 'react';

export default class InputFields extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pickup: '',
			dropoff: ''
		}

		this.updateField = this.updateField.bind(this);
	}

	render() {
		return (
			<div className="fieldContainer">
				<div className="fieldDiv flex-center">
					<input
						type='text'
						placeholder="Pickup Address"
						name='pickup'
						value={this.state.pickup}
						onChange={this.updateField}
					/>
					<div
						className="setCurrentLocation"
						data-name="pickup"
						onClick={this.setCurrentAsPickup}
					></div>
						
				</div>

				<div className="fieldDiv flex-center">
					<input
						type='text'
						placeholder="Dropoff Address"
						name='dropoff'
						value={this.state.dropoff}
						onChange={this.updateField}
					/>
					<div
						className="setCurrentLocation"
						data-name="dropoff"
						onClick={this.setCurrentAsPickup}
					></div>
				</div>
			</div>
		)
	}

	updateField = (event) => {
		const target = event.target;

		this.setState({
			[target.name]: target.value
		});
	}

	setCurrentAsPickup = (event) => {
		this.props.setLocation(event.target.dataset['name']);
	}
}