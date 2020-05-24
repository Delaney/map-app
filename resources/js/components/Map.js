import React, { Component } from 'react';

import Marker from './Marker';

export default class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: null,
			infoWindow: null
		};
	}

	componentDidMount() {
		this.initMap();
	}

	render() {
		const mapStyle = {
			height: '100%'
		}

		const containerStyle = {
			height: '600px'
		}

		return (
			<div className="mapContainer" style={containerStyle}>
				<div id="map" style={mapStyle}></div>
			</div>
		)
	}

	initMap = () => {
		let center = (this.props.pickup) ? this.props.pickup : this.props.position;
		const map = new google.maps.Map(document.getElementById('map'), {
			center: center,
			zoom: 15
		});

		const infoWindow = new google.maps.InfoWindow();

		this.props.onLoad(map);
	}
}