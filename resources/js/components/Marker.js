import React, { Component } from 'react';

export default class Marker extends Component {
	constructor(props) {
		super(props);
	}

	initMarker = () => {
		let marker = new google.maps.Marker({
			position: {lat: this.props.position.lat, lng: this.props.position.lng},
			map: this.props.map
		});

		this.props.updateMarker({marker: marker, number: this.props.number});
	}
	
	componentDidMount() {
		this.initMarker();
	}
	
	render() {
		return (
			''
		);
	}
}