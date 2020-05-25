import React, { Component } from 'react';
import PredictionList from './PredictionList';

import BackArrow from '../../assets/icons/back.svg';

export default class AddressSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bounds: null,
			pickup: '',
			dropoff: '',
			pickupAutocomplete: null,
			predictions: []
		}

		this.initPickup = this.initPickup.bind(this);
		this.updateField = this.updateField.bind(this);
		this.search = this.search.bind(this);
	}

	componentDidMount() {
		console.log(this.props.status);
	}
	
	render() {
		return(
			<div className="pl-3 pr-3 pt-3">
				<div className="row">
					<div className="backLink" onClick={this.back}>
						<span className="backIcon"><img src={BackArrow} /></span>
						Back
					</div>
					{
						this.props.pickupType ?
						<h3 className="text-center">Pickup</h3> :
						<h3 className="text-center">Dropoff</h3>
					}
				</div>

				<div className="fieldDiv flex-center">
					<input
						type='text'
						placeholder="Pickup Address"
						name='pickup'
						id='search-input'
						onChange={this.search}
					/>	
				</div>

				{
					this.state.predictions.length ?
					<PredictionList predictions={this.state.predictions} appState={this.props.appState} setLocation={this.setLocation} />
					:
					''
				}
			</div>
		)
	}

	initPickup = () => {
		const circle = new this.props.maps.Circle({
			center: this.props.position,
			radius: 50000,
		});

		this.setState({
			bounds: circle.getBounds()
		});

	}

	back = () => { }

	search = () => {
		const _this = this;
		const displaySuggestions = function(predictions, status) {
			if (status != _this.props.maps.places.PlacesServiceStatus.OK) {
				console.log(status);
				return;
			}

			_this.setState({ predictions: predictions });
		};

		let val = document.getElementById('search-input').value;
		if (val) {
			var service = new this.props.maps.places.AutocompleteService();
			service.getPlacePredictions({
				input: val,
				bounds: this.state.bounds,
				types: ['address']	
			}, displaySuggestions);
		} else {
			this.setState({ predictions: [] });
		}

	}

	updateField = (event) => {
		const target = event.target;

		this.setState({
			[target.name]: target.value
		});
	}
	// }

	setLocation = (id) => {
		const types = [
			{ a: 'pickupPosition', b: 'pickup' },
			{ a: 'dropoffPosition', b: 'dropoff'}
		];
		let i = (this.props.pickupType) ? 0 : 1;
		let _this = this;

		let geocoder = new this.props.maps.Geocoder();
		geocoder.geocode({'placeId': id}, (results, status) => {
			if (status === 'OK') {
				_this.props.setLocation({
					[types[i].a]: {
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng()
					},
					[types[i].b]: results[0].formatted_address
				});
				_this.props.history.replace('/');
			};
		});
	}

	setCurrentAsPickup = (event) => {
		this.props.setLocation(event.target.dataset['name']);
	}
};