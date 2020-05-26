import React, { Component } from "react";

import Map from './Map';

export default class MapManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: []
		}

		this.setMarker = this.setMarker.bind(this);
	}

	componentDidMount() {
		this.startMarker();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.pickupPosition !== this.props.pickupPosition) this.startMarker();
		if (prevProps.dropoffPosition !== this.props.dropoffPosition) this.endMarker();
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
				name: "Location"
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
				<Map
					position={this.props.position}
					pickup={this.props.pickupPosition}
					dropoff={this.props.dropoffPosition}
					onLoad={this.setMarker}
					setGoogleMapsObjs={this.setGoogleMapsObjs}
					markers={this.state.markers}
				/>
			</div>
		)
	}

	setMarker = (map) => this.setState({map: map});

	setGoogleMapsObjs = (data) => this.props.setGoogleMapsObjs(data);
}