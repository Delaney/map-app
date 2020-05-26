import React, { Component } from 'react';
import GoogleMapReact, { fitBounds } from 'google-map-react';

import Marker from './Marker';

export default class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			maps: null,
			bounds: null,
			dropoff: null
		};

		this.setBounds = this.setBounds.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.pickup !== this.props.pickup || prevProps.dropoff !== this.props.dropoff) this.setBounds();
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
		this.setState({ maps: maps });

		this.setBounds();
	}
	
	setBounds = () => {
		if (this.props.dropoff) {
			let bounds = new this.state.maps.LatLngBounds();
			bounds.extend(this.props.pickup);
			bounds.extend(this.props.dropoff);
			
			this.setState({ bounds: bounds });
		} else {
			this.setState({ bounds: null });
		}
	}
}