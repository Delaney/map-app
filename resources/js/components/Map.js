import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import Marker from './Marker';

export default class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			maps: null,
			bounds: null,
			dropoff: null,
			line: null
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

		const mapOptions = {
			disableDefaultUI: true,
			styles: [
				{
					"stylers": [
						{ "visibility": "off" }
					]
				}, {
					"featureType": "road",
					"elementType": "all",
					"stylers": [
						{ "visibility": "on" }
					]
				}
			]
		}

		if (this.state.bounds) {
			const mapContainer = document.getElementsByClassName('mapContainer')[0];
			const size = {
				width: mapContainer.clientWidth,
				height: mapContainer.clientHeight
			}
			const bounds = {
				ne: {
					lat: this.state.bounds.getNorthEast().lat(),
					lng: this.state.bounds.getNorthEast().lng()
				},
				sw: {
					lat: this.state.bounds.getSouthWest().lat(),
					lng: this.state.bounds.getSouthWest().lng()
				}
			}
			const {center, zoom} = fitBounds(bounds, size);

			return (
				<div className="mapContainer" style={containerStyle}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: process.env.MIX_MAP_API, libraries: ["places"] }}
						options={mapOptions}
						center={center}
						zoom={zoom ? zoom : 16}
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
						options={mapOptions}
						center={(this.props.pickup) ? this.props.pickup : this.props.position}
						zoom={16}
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
		this.setState({ map: map, maps: maps });

		this.setBounds();
	}
	
	setBounds = () => {
		if (this.props.dropoff) {
			let bounds = new this.state.maps.LatLngBounds();
			bounds.extend(this.props.pickup);
			bounds.extend(this.props.dropoff);
			
			this.setState({ bounds: bounds });
			this.drawLine();
		} else {
			this.setState({ bounds: null });
		}
	}

	drawLine = () => {
		if (this.state.line) this.state.line.setMap(null);
		let coordinates = [this.props.pickup, this.props.dropoff];
		let line = new this.state.maps.Polyline({
			path: coordinates,
			clickable: false,
			geodesic: true,
			strokeColor: '#00c799'
		});

		this.setState({ line: line });
		line.setMap(this.state.map);
	}
}