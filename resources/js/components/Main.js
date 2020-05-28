import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MapManager from '../components/MapManager';

export default class Main extends Component {
	constructor() {
		super();

		this.state = {
			map: null
		};
	}

	render() {
		return (
			<div>
				<div className="addressBar">
					<h2 className="title text-center">Parcel Request</h2>
					<div className="gap-1"></div>
					<div>
						<div className="addressFields" onClick={this.openSelect} data-pickup={1} style={this.props.pickup ? { color: '#000' } : {}}>
							{ (this.props.pickup) ? this.props.pickup : "Pickup Address" }
						</div>
					</div>
					<div className="gap-1"></div>
					<div>
						<div className="addressFields" onClick={this.props.pickupPosition ? this.openSelect : null} data-pickup={0} style={this.props.dropoff ? { color: '#000' } : {}}>
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
}


Main.propTypes = {
	pickup: PropTypes.string,
	pickupPosition: PropTypes.object,
	dropoff: PropTypes.string,
	dropoffPosition: PropTypes.object,
	position: PropTypes.object,
	setGoogleMapsObjs: PropTypes.func,
	openSelect: PropTypes.func
};