import React, { Component } from 'react';
import PredictionList from './PredictionList';

import BackArrow from '../../assets/icons/back.svg';
import Location from '../../assets/icons/place.svg';

const types = [
	{ a: 'pickupPosition', b: 'pickup' },
	{ a: 'dropoffPosition', b: 'dropoff'}
];
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

	componentDidUpdate(prevProps) {
		if (this.props.status.isOpen && prevProps.status.isOpen !== this.props.status.isOpen && !this.state.bounds) this.initPickup(); document.getElementById('search-input').focus();
	}
	
	render() {
		const open = {
			position: 'absolute',
			top: '0',
			background: '#ffffff',
			height: '100%',
			width: '100%',
			margin: '0 auto',
			paddingTop: '2rem'
		}

		const closed = { 
			display: 'none'
		}

		return(
			<div className="pl-3 pr-3" style={(this.props.status.isOpen) ? open : closed}>
				<div className="row">
					<div className="backLink" onClick={this.back}>
						<span className="backIcon"><img src={BackArrow} /></span>
						Back
					</div>
					<h2 className="text-center title" style={{ width: '100%' }}>{
						this.props.status.type ? "Pickup" : "Dropoff"
					}</h2>
				</div>

				<div className="gap-1"></div>

				<div className="fieldDiv flex-center">
					<input
						type='text'
						className='addressFields'
						placeholder="Pickup Address"
						name='pickup'
						id='search-input'
						autoComplete="off"
						onChange={this.search}
					/>	
				</div>

				<div className="gap-3"></div>

				{
					this.state.predictions.length ?
					<PredictionList predictions={this.state.predictions} setLocation={this.setLocation} />
					:
					<div className="prediction-list">
						<li onClick={this.setCurrent}>
							<div className="marker-icon">
								<img src={Location} />
							</div>

							<div></div>

							<div>
								<div className="main">Use current location</div>
							</div>
						</li>
					</div>
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

	setLocation = (id) => {
		let i = (this.props.status.type) ? 0 : 1;
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
				_this.back();
			};
		});
	}

	setCurrent = () => {
		let i = (this.props.status.type) ? 0 : 1;
		let _this = this;

		let geocoder = new this.props.maps.Geocoder();
		geocoder.geocode({'location': this.props.position}, (results, status) => {
			if (status === 'OK') {
				_this.props.setLocation({
					[types[i].a]: {
						lat: this.props.position.lat,
						lng: this.props.position.lng
					},
					[types[i].b]: results[0].formatted_address
				});
				_this.back();
			};
		});
	}

	back = () => {
		document.getElementById('search-input').value = "";
		this.setState({ predictions: [] });
		this.props.closeSelect();
	}
};