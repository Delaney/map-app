import React, { Component } from "react";

import Map from './Map';
import Marker from './Marker';

export default class MapManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marker1: null,
			marker2: null
		}

		this.setMarker = this.setMarker.bind(this);
		this.updateMarker = this.updateMarker.bind(this);
	}

	componentDidMount() {
		if (this.state.marker1) this.state.marker1.setMap(null);
		if (this.state.marker2) this.state.marker2.setMap(null);
	}

	startMarker = () => {
		if(this.state.map) {
			return (this.props.pickupPosition) ? 
				<Marker
					number="1"
					position={this.props.pickupPosition}
					map={this.state.map}
					updateMarker={this.updateMarker}
				/> :
				<Marker
					number="1"
					position={this.props.position}
					map={this.state.map}
					updateMarker={this.updateMarker}
				/>
		}
	}

	endMarker = () => (this.state.map && this.props.dropoffPosition) ?
		<Marker
			number="2"
			position={this.props.dropoffPosition}
			map={this.state.map}
			updateMarker={this.updateMarker}
		/> :
		''

	nullF = () => null;

	render() {
		return (
			<div>
				<div>
					<Map
						position={this.props.position}
						pickup={this.props.pickupPosition}
						dropoff={this.props.dropoff}
						onLoad={this.setMarker}
					/>
				</div>

				{
					this.startMarker()
				}

				{
					this.endMarker()
				}
			</div>
		)
	}

	setMarker = (map) => {
		this.setState({map: map});
	}

	updateMarker = (data) => {
		// console.log("Nulling map");
		// console.log([this, data]);
		// if (this.state[`marker${data.number}`]) this.state[`marker${data.number}`].setMap(null);
		this.setState({
			[`marker${data.number}`]: data.marker
		});
	}
}