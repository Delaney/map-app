import React, { Component } from 'react';

export default class AddressSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bounds: null,
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
		return(
			<div className="pl-5 pr-5">
				<h3 className="text-center">Address Select</h3>

				<div className="fieldDiv flex-center">
					<input
						type='text'
						placeholder="Pickup Address"
						name='pickup'
						id='search-input'
						onChange={this.fillInAddress}
					/>	
				</div>
			</div>
		)
	}

	initPickup = () => {
		const circle = new google.maps.Circle({
			center: this.props.position,
			radius: 50000,
		});

		this.setState({
			bounds: circle.getBounds()
		});

	}

	fillInAddress = () => {
		const displaySuggestions = function(predictions, status) {
			if (status != google.maps.places.PlacesServiceStatus.OK) {
				alert(status);
				return;
			}

			console.log(predictions);

			// predictions.forEach(function(prediction) {
			// 	var li = document.createElement('li');
			// 	li.appendChild(document.createTextNode(prediction.description));
			// 	document.getElementById('results').appendChild(li);
			// });
		};

		let val = document.getElementById('search-input').value;
		if (val) {
			var service = new google.maps.places.AutocompleteService();
			service.getQueryPredictions({
				input: val,
				bounds: this.state.bounds		
			}, displaySuggestions);
		}

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