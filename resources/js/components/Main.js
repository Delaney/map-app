import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Map from '../components/Map';
import Marker from '../components/Marker';
import AddressField from '../components/AddressField';

export default withRouter(class Main extends Component {
	constructor() {
		super();

		this.state = {
			pickup: '',
			dropoff: '',
			map: null,
			pickupPosition: null,
			dropoffPosition: null,
			redirect: null
		};

		this.setMarker = this.setMarker.bind(this);
		this.openSelect = this.openSelect.bind(this);
	}

	componentDidMount() {
		if (this.props.history && this.props.history.place_id) {
			console.log(this.props.history);
		}
	}

	render() {
		return (
			<div>
				<div className="addressBar">
					<h2 className="text-center">Parcel Request</h2>
						<div>
							<AddressField
								placeholder="Pickup Address"
								value={this.props.pickup}
								openSelect={this.openSelect}
								pickup={true}
							/>
						</div>
						<div className="gap-3"></div>
						<div>
							<AddressField
								placeholder="Dropoff Address"
								value={this.props.dropoff}
								openSelect={this.openSelect}
								pickup={false}
							/>
						</div>
				</div>
					
				<div>
					<Map
						position={this.props.position}
						onLoad={this.setMarker}
					/>
				</div>

				{
					this.state.map ?
						<Marker
							position={this.props.position}
							map={this.state.map}
						/>
						:
						''
				}
			</div>
		);
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

	openSelect = () => {
		// this.setState({ redirect: `address` });
		// this.props.setAppState(this.state);
	}
});