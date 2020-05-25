import React, { Component } from 'react';

export default class Marker extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<div className="marker-text">{this.props.name}</div>
				<div className="marker" title={this.props.name}>
					<div className="marker-inner"></div>
				</div>
			</div>
		);
	}
}