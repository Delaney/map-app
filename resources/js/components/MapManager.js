import React, { Component } from "react";
import PropTypes from 'prop-types';

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
			let m = this.state.markers;
			m[0] = {
				lat: this.props.pickupPosition.lat,
				lng: this.props.pickupPosition.lng,
				name: "Pickup"
			}
			this.setState({ markers: m });			
		} else {
			let m = this.state.markers;
			m[0] = {
				lat: this.props.position.lat,
				lng: this.props.position.lng,
				name: "Location"
			}
			this.setState({ markers: m });
		}
	}

	endMarker = () => {
		if (this.props.dropoffPosition) {
			let m = this.state.markers;
			m[1] = {
				lat: this.props.dropoffPosition.lat,
				lng: this.props.dropoffPosition.lng,
				name: "Dropoff"
			}
			this.setState({ markers: m });
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

MapManager.propTypes = {
	pickupPosition: PropTypes.object,
	dropoffPosition: PropTypes.object,
	position: PropTypes.object,
	setGoogleMapsObjs: PropTypes.func
}