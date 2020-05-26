import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Main from '../components/Main';
import AddressSelect from '../components/AddressSelect';
import TripDetails from '../components/TripDetails';
// import GeoModal from '../components/GeoModal.js';

class App extends Component {
	constructor() {
		super();

		this.state = {
			geolocation: false,
			pickup: '',
			dropoff: '',
			position: null,
			pickupPosition: null,
			dropoffPosition: null,
			redirect: null,
			maps: null,
			openSelect: {
				isOpen: false,
				type: null
			}
		};

		this.setAddress = this.setAddress.bind(this);
		this.setCurrentLocation = this.setCurrentLocation.bind(this);
	}

	componentDidMount() {
		if (!this.state.geolocation) {
			this.setCurrentLocation();
		}
	}

	render() {
		const trip = (this.state.pickup && this.state.dropoff) ? <TripDetails /> : null;

		return (
			<div>
				{
					this.state.position
					?
					<div>
							<Main
								position={this.state.position}
								pickup={this.state.pickup}
								pickupPosition={this.state.pickupPosition}
								dropoff={this.state.dropoff}
								dropoffPosition={this.state.dropoffPosition}
								setGoogleMapsObjs={this.setGoogleMapsObjs}
								openSelect={this.openSelect}
							/>
							<AddressSelect
								position={this.state.position}
								setLocation={this.setAddress}
								maps={this.state.maps}
								status={this.state.openSelect}
								closeSelect={this.closeSelect}
							/>
					</div>
					:
					<div>
						<h2 style={{ textAlign: 'center', margin: '200px 0' }}>Loading</h2>
					</div>
				}
				
				{ trip }
			</div>
		)
	}

	setCurrentLocation = () => {
		let _this = this;
		if (navigator.geolocation) {
			let geo = {};
			navigator.geolocation.getCurrentPosition(function(position) {
				geo = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				_this.setState({ position: geo, geolocation: true });
			});
		} else {
			alert("Sorry, this browser does not support geolocation!");
		}
		
	}

	setAddress = (data) => this.setState(data);

	setGoogleMapsObjs = (data) => this.setState(data);

	openSelect = (pickup) => this.setState({ openSelect: { isOpen: true, type: pickup }});

	closeSelect = () => this.setState({ openSelect: { isOpen: false, type: null }});
}

ReactDOM.render(<App />, document.getElementById('app'));