import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../components/Main';
import AddressSelect from '../components/AddressSelect';
import GeoModal from '../components/GeoModal.js';


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
									<Route exact path='/' render={() => <Main position={this.state.position} />} />
									<Route path='/address' render={() => <AddressSelect position={this.state.position} />} />
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


}

ReactDOM.render(<App />, document.getElementById('app'));