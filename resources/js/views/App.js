import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../components/Main';
import AddressSelect from '../components/AddressSelect';
import GeoModal from '../components/GeoModal.js';

import Redirect from 'react-router-dom';

class App extends Component {
	constructor() {
		super();

		this.state = {
			scriptReady: false,
			geolocation: false,
			pickup: '',
			dropoff: '',
			position: null,
			pickupPosition: null,
			dropoffPosition: null,
			redirect: null
		};

		this.loadGMaps = this.loadGMaps.bind(this);
		this.setAddress = this.setAddress.bind(this);
		this.setCurrentLocation = this.setCurrentLocation.bind(this);
	}

	componentDidMount() {
		this.loadGMaps();
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						{
							this.state.scriptReady && this.state.position
							?
							<BrowserRouter>
								<Switch>
									<Route exact path='/' render={() =>
										<Main
											position={this.state.position}
											pickup={this.state.pickup}
											pickupPosition={this.state.pickupPosition}
											dropoff={this.state.dropoff}
											dropoffPosition={this.state.dropoffPosition}
										/>
									} />
									<Route path='/address' render={() =>
										<AddressSelect
											position={this.state.position}
											setLocation={this.setAddress}
										/>}
									/>
								</Switch>
							</BrowserRouter>
							
							:
							<div>
								<h2>Loading</h2>
							</div>
						}
					</div>
				</div>
			
				<GeoModal
					setLocation={this.setCurrentLocation}
				/>
			</div>
		)
	}
	
	loadGMaps = (cb) => {
		const gm = document.getElementById('googleMaps');

		if (!gm) {
			const script = document.createElement('script');
			// script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MIX_MAP_API}&libraries=places`;
			script.src = `https://maps.googleapis.com/maps/api/js?v=quarterly&key=${process.env.MIX_MAP_API}&libraries=places`;
			script.id = 'googleMaps';
			script.defer = true;
			script.async = true;
			document.body.appendChild(script);

			script.onload = () => {
				if (cb) cb();
				if (!this.state.geolocation) {
					document.getElementById('getLocationConsent').click();
				} else {
					this.setState({ scriptReady: true });
				}
			}
		}

		if (gm && cb) cb();

	};

	setCurrentLocation = (position) => {
		this.setState({
			position: position,
			scriptReady: true
		});
	};

	setAddress = (data) => {
		console.log(data);
		const types = [
			{ a: 'pickupPosition', b: 'pickup' },
			{ a: 'dropoffPosition', b: 'dropoff'}
		];
		let i = (data.pickup) ? 0 : 1;
		let _this = this;

		let geocoder = new google.maps.Geocoder();
		geocoder.geocode({'placeId': data.place_id}, (results, status) => {
			if (status === 'OK') {
				console.log(results[0]);

				_this.setState({
					[types[i].a]: {
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng()
					},
					[types[i].b]: results[0].formatted_address
				});
			};
		});

	}
}

ReactDOM.render(<App />, document.getElementById('app'));