import React, { Component} from 'react';

const componentForm = {
	street_number: 'short_name'
}

export default class InputFields extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pickup: '',
			dropoff: '',
			pickupAutocomplete: null
		}

		this.initPickup = this.initPickup.bind(this);
		this.updateField = this.updateField.bind(this);
	}

	componentDidMount() {
		this.initPickup();
	}

	render() {
		return (
			<div className="fieldContainer">
				<div className="fieldDiv flex-center">
					<input
						type='text'
						placeholder="Pickup Address"
						name='pickup'
						id='pickup-input'
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

	initPickup = () => {
		const circle = new google.maps.Circle({
			center: this.props.position,
			radius: 50000,
		});

		// const re = new google.maps.places.ComponentRestriction({ country: 'ng'});
		
		const pickupAutocomplete = new google.maps.places.Autocomplete(document.getElementById('pickup-input'), {
			bounds: circle.getBounds(),
			// componentRestrictions: new google.maps.places.ComponentRestrictions({country: 'ng'}),
			types: ['geocode'],
			fields: ['address_component', 'place_id', 'geometry'],
			strictBounds: true
		});

		// pickupAutocomplete.setFields(['address_component', 'name']);
		pickupAutocomplete.addListener('place_changed', this.fillInAddress);

		this.setState({
			pickupAutocomplete: pickupAutocomplete
		});
	}

	fillInAddress = () => {
		let place = this.state.pickupAutocomplete.getPlace();

		console.log(place);

		// for (let i = 0; i < place.address_components.length; i++) {
		// 	let addressType = place.address_components[i].types[0];
		// 	if (componentForm[addressType]) {
		// 		let val = place.address_components[i][componentForm[addressType]];
		// 		document.getElementById(addressType).value = val;
		// 	}
		// }
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