import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Map from '../components/Map';
import InputFields from '../components/InputFields';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scriptReady: false,
			pickup: '',
			dropoff: '',
			position: null
		};

		this.loadGMaps = this.loadGMaps.bind(this);
		this.updateMap = this.updateMap.bind(this);
	}

	loadGMaps = (cb) => {
		const gm = document.getElementById('googleMaps');

		if (!gm) {
			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MIX_MAP_API}`;
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

	componentDidMount() {
		this.loadGMaps();
	}

	render() {
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card">
							<div className="card-header">React + Laravel</div>

							<div className="card-body">
								{this.state.scriptReady && this.state.position ? <Map position={this.state.position} /> : <div><h2>Loading</h2></div>}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));