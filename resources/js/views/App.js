import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Map from '../components/Map';
import InputFields from '../components/InputFields';
import Marker from '../components/Marker';
import GeoModal from '../components/GeoModal';

class App extends Component {
	constructor() {
		super();

		this.state = {
			scriptReady: false,
			geolocation: false,
			pickup: '',
			dropoff: '',
			position: null,
			map: null,
			pickupPosition: null,
			dropoffPosition: null
		};

		this.loadGMaps = this.loadGMaps.bind(this);
		this.setMarker = this.setMarker.bind(this);
		this.setCurrentLocation = this.setCurrentLocation.bind(this);
	}

	componentDidMount() {
		this.loadGMaps();
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">
								{
									this.state.scriptReady && this.state.position ?
										<div>
											<InputFields
												position={this.state.position}
												setLocation={this.setLocation}
											/>
										</div>
										:
										''
								}
							</div>

							<div className="">
								{
									this.state.scriptReady && this.state.position ?
										<div>
											<Map
												position={this.state.position}
												onLoad={this.setMarker}
											/>
										</div>
										:
										<div>
											<h2>Loading</h2>
										</div>
								}

								{
									this.state.map ?
										<Marker
											position={this.state.position}
											map={this.state.map}
										/>
										:
										''
								}
							</div>
						</div>
					</div>
				</div>
			
				<GeoModal
					setLocation={this.setCurrentLocation}
				/>
			</div>
		);
	}

	loadGMaps = (cb) => {
		const gm = document.getElementById('googleMaps');

		if (!gm) {
			const script = document.createElement('script');
			// script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MIX_MAP_API}&libraries=places&callback=initAutocomplete`;
			script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MIX_MAP_API}&libraries=places`;
			script.id = 'googleMaps';
			script.defer = true;
			script.async = true;
			document.body.appendChild(script);

			script.onload = () => {
				// google.maps.event.addDomListener(window, 'load', initAutocomplete);
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
	}

	setMarker = (map) => {
		this.setState({map: map});
	}

	setLocation = (name) => {
		console.log(name);
		let isPickup = (name == 'pickup') ? true : false;

		this.setState({
			[(isPickup) ? 'pickupLocation' : 'dropoffLocation']: this.state.position
		});
	}
}

ReactDOM.render(<App />, document.getElementById('app'));