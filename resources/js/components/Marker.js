import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Marker extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<span className="marker-text">{this.props.text}</span>
				<div className="marker" title={this.props.text}>
					<div className="marker-inner"></div>
				</div>
			</div>
		);
	}
}

Marker.propTypes = {
	text: PropTypes.string
}