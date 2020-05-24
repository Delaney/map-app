import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Location from '../../assets/icons/place.svg';

export default withRouter(class PredictionListItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const style = {

		}

		return (
			<li onClick={this.select}>
				<div className="marker-icon">
					<img src={Location} />
				</div>

				<div></div>

				<div>
					<div className="main">{this.props.item.structured_formatting.main_text}</div>
					<div className="sub">{this.props.item.structured_formatting.secondary_text}</div>
				</div>
			</li>
		)
	}

	select = () => {
		this.props.select(this.props.item.place_id);
	}
});