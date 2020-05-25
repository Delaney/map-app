import React, { Component } from 'react';

import MapManager from '../components/MapManager';
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
								pickup={true}
								openSelect={this.openSelect}
							/>
						</div>
						<div className="gap-3"></div>
						<div>
							<AddressField
								placeholder="Dropoff Address"
								value={this.props.dropoff}
								pickup={false}
								openSelect={this.openSelect}
							/>
						</div>
				</div>
					
				<MapManager
					map={this.state.map}
					position={this.props.position}
					pickupPosition={this.props.pickupPosition}
					dropoffPosition={this.props.dropoffPosition}
					setGoogleMapsObjs={this.setGoogleMapsObjs}
				/>
			</div>
		);
	}

	setGoogleMapsObjs = (data) => {
		this.props.setGoogleMapsObjs(data);
	}

	openSelect = (pickup) => {
		this.props.openSelect(pickup);
	}
};