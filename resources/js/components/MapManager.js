import React, { Component } from "react";

import Map from './Map';
import Marker from './Marker';

export default class MapManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marker1: null,
			marker2: null,
			markers: []
		}

		this.setMarker = this.setMarker.bind(this);
		this.updateMarker = this.updateMarker.bind(this);
	}

	componentDidMount() {
		this.startMarker();
		this.endMarker();
	}

	startMarker = () => {
		if (this.props.pickupPosition) {
			this.state.markers[0] = {
				lat: this.props.pickupPosition.lat,
				lng: this.props.pickupPosition.lng,
				name: "Pickup"
			}
		} else {
			this.state.markers[0] = {
				lat: this.props.position.lat,
				lng: this.props.position.lng,
				name: "Your Location"
			}
		}
	}

	endMarker = () => {
		if (this.props.dropoffPosition) {
			this.state.markers[1] = {
				lat: this.props.dropoffPosition.lat,
				lng: this.props.dropoffPosition.lng,
				name: "Dropoff"
			}
		}
	}

	render() {
		return (
			<div>
				<div>
					<Map
						position={this.props.position}
						pickup={this.props.pickupPosition}
						dropoff={this.props.dropoff}
						onLoad={this.setMarker}
						setGoogleMapsObjs={this.setGoogleMapsObjs}
						markers={this.state.markers}
					/>
				</div>
			</div>
		)
	}

	setMarker = (map) => {
		this.setState({map: map});
	}

	updateMarker = (data) => {
		this.setState({
			[`marker${data.number}`]: data.marker
		});
	}

	setGoogleMapsObjs = (data) => {
		this.props.setGoogleMapsObjs(data);
	}
}