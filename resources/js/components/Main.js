import React, { Component } from 'react';

import MapManager from '../components/MapManager';

export default class Main extends Component {
	constructor() {
		super();

		this.state = {
			map: null,
			// pickup: '',
			// dropoff: '',
			// pickupPosition: null,
			// dropoffPosition: null,
			// redirect: null
		};
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div>
				<div className="addressBar">
					<h2 className="text-center">Parcel Request</h2>
						<div>
							<div onClick={this.openSelect} data-pickup={1}>
								{ (this.props.pickup) ? this.props.pickup : "Pickup Address" }
							</div>
						</div>
						<div className="gap-3"></div>
						<div>
							<div onClick={this.openSelect} data-pickup={0}>
								{ (this.props.dropoff) ? this.props.dropoff : "Dropoff Address" }	
							</div>
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

	setGoogleMapsObjs = (data) => this.props.setGoogleMapsObjs(data);

	openSelect = (event) => this.props.openSelect(parseInt(event.target.dataset.pickup));
};