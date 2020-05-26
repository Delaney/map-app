import React, { Component } from 'react';
import PredictionListItem from './PredictionListItem';

export default class PredictionList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="prediction-list">
				{
					this.props.predictions.map((prediction) => {
						return (<PredictionListItem key={prediction.place_id} item={prediction} select={this.setLocation} />);
					})
				}
			</div>
		)
	}

	setLocation = (id) => this.props.setLocation(id);
}