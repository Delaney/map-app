import React, { Component } from 'react';

export default class Map extends Component {
	constructor(props) {
		super(props);
	}

	initMap = () => {
		const map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: this.props.position.lat, lng: this.props.position.lon},
			zoom: 10
		});
	}

	componentDidMount() {
		this.initMap();
	}

	render() {
		const mapStyle = {
			height: '100%'
		}

		const containerStyle = {
			height: '500px'
		}

		return (
			<div className="mapContainer" style={containerStyle}>
				<div id="map" style={mapStyle}></div>
			</div>
		)
	}
}