import React, { Component } from 'react';

export default class Marker extends Component {
	constructor(props) {
		super(props);
	}

	initMarker = () => {
		const marker = new google.maps.Marker({
			position: {lat: this.props.position.lat, lng: this.props.position.lon},
			map: this.props.map
		});
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