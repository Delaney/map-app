import React, { Component } from 'react';

import Map from '../components/Map';
import Marker from '../components/Marker';
import { Redirect, Link } from 'react-router-dom';

import AddressField from '../components/AddressField';

export default class Main extends Component {
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

	render() {
		if (this.state.redirect) return <Redirect to={this.state.redirect} />

		return (
			<div>
				<div className="addressBar">
					<h2 className="text-center">Parcel Request</h2>
						<div>
							<AddressField
								placeholder="Pickup Address"
								value={this.state.pickup}
								openSelect={this.openSelect}
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

	openSelect = (route) => {
		this.setState({ redirect: `address` });
	}
}