import React, { Component } from 'react';
import GoogleMapReact, { fitBounds } from 'google-map-react';

import Marker from './Marker';

export default class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: null,
			bounds: null
		};

		this.setBounds = this.setBounds.bind(this);
	}

	render() {
		const containerStyle = {
			height: '600px',
			width: '100%'
		}

		if (this.state.bounds) {
			return (
				<div className="mapContainer" style={containerStyle}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.MIX_MAP_API, libraries: ["places"] }}
						center={{ lat: this.state.bounds.getCenter().lat(), lng: this.state.bounds.getCenter().lng() }}
						zoom={12}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
					>
						{
							this.props.markers.map((marker) => {
								return (
									<Marker
										key={marker.name}
										text={marker.name}
										lat={marker.lat}
										lng={marker.lng}
									/>
								);
							})
						}
					</GoogleMapReact>
				</div>
			)
		} else {
			return (
				<div className="mapContainer" style={containerStyle}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.MIX_MAP_API, libraries: ["places"] }}
						center={(this.props.pickup) ? this.props.pickup : this.props.position}
						zoom={12}
						yesIWantToUseGoogleMapApiInternals
						onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
					>
						{
							this.props.markers.map((marker) => {
								return (
									<Marker
										key={marker.name}
										text={marker.name}
										lat={marker.lat}
										lng={marker.lng}
									/>
								);
							})
						}
					</GoogleMapReact>
				</div>
			)
		}

	}

	handleApiLoaded = (map, maps) => {
		this.props.setGoogleMapsObjs({ map: map, maps: maps });

		this.setBounds(maps);
	}
	
	setBounds = (maps) => {
		if (this.props.dropoff) {
			let markers = this.props.markers;
			
			let bounds = new maps.LatLngBounds();
			markers.forEach(marker => {
				bounds.extend(marker);
			});

			console.log(bounds);
			
			this.setState({ bounds: bounds });
		} else {
			this.setState({ bounds: null });
		}
	}

	change = () => {
		console.log("Changed");
	}
}