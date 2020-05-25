import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

export default class Map extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: null,
			infoWindow: null
		};
	}

	render() {
		const containerStyle = {
			height: '600px',
			width: '100%'
		}

		return (
			<div className="mapContainer" style={containerStyle}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.MIX_MAP_API, libraries: ["places"] }}
					defaultCenter={(this.props.pickup) ? this.props.pickup : this.props.position}
					zoom={12}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
				>
					{
						this.props.markers.map((marker) => {
							console.log(marker);
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

	handleApiLoaded = (map, maps) => {
		this.props.setGoogleMapsObjs({ map: map, maps: maps });
	}
}