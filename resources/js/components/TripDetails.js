import React, {Component} from 'react';

export default class TripDetails extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div className="tripBar">
				<div className="tripDetails">
					<span className="price">₦1500.<small>00</small></span>

					<span>3.3km | 24 mins</span>
				</div>
				<div className="tripButton">
					<button className=" btn btn-block">Enter Parcel Details</button>
				</div>
			</div>
		)
	}
}