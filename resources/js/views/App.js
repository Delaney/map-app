import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import Map from '../components/Map';
import InputFields from '../components/InputFields';
import Marker from '../components/Marker';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scriptReady: false,
			pickup: '',
			dropoff: '',
			position: null,
			map: null,
			pickupPosition: null,
			dropoffPosition: null
		};

		this.loadGMaps = this.loadGMaps.bind(this);
		this.updateMap = this.updateMap.bind(this);
		this.setMarker = this.setMarker.bind(this);
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
								<InputFields
									onUpdate={this.searchPlaces}
									setLocation={this.setLocation}
								/>
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
			</div>
		);
	}

	loadGMaps = (cb) => {
		const gm = document.getElementById('googleMaps');

		if (!gm) {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MIX_MAP_API}&libraries=places`;
			script.id = 'googleMaps';
			document.body.appendChild(script);

			script.onload = () => {
				if (cb) cb();
				this.getLocation();
				this.setState({ scriptReady: true });
			}
		}

		if (gm && cb) cb();

	};

	updateMap = (position) => {
		let lat = position.coords.latitude;
		let lon = position.coords.longitude;

		console.log(lat, lon);
		
		this.setState({
			position: {
				lat: lat,
				lon: lon
			}
		});
	}

	errorHandler = (err) => {
		if(err.code == 1) {
			alert("Error: Access is denied!");
		} else if( err.code == 2) {
			alert("Error: Position is unavailable!");
		}
	}

	getLocation = () => {
		if(navigator.geolocation){
			let options = { timeout:60000 };
			navigator.geolocation.getCurrentPosition
			(this.updateMap, this.errorHandler, options);
		} else{
			console.log("Sorry, browser does not support geolocation!");
		}
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

	searchPlaces = (query) => {

	}

	// getPlaceId = (position) => {
	// 	axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY`)
	// }
}

ReactDOM.render(<App />, document.getElementById('app'));