import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Main from '../components/Main';
import AddressSelect from '../components/AddressSelect';
import GeoModal from '../components/GeoModal.js';

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
			document.getElementById('getLocationConsent').click();
		}
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-12">
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

	setCurrentLocation = (position) => this.setState({ position: position });

	setAddress = (data) => this.setState(data);

	setGoogleMapsObjs = (data) => this.setState(data);

	openSelect = (pickup) => this.setState({ openSelect: { isOpen: true, type: pickup }});

	closeSelect = () => this.setState({ openSelect: { isOpen: false, type: null }});
}

ReactDOM.render(<App />, document.getElementById('app'));