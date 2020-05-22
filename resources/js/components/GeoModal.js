import React, { Component } from 'react';

export default class GeoModal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const hidden = { display: 'none' };

		return (
			<div>
				<button type="button" style={hidden} id="getLocationConsent" data-toggle="modal" data-target="#locationConsentModal"></button>

				<div className="modal fade" id="locationConsentModal" tabIndex="-1" role="dialog" aria-labelledby="locationConsentModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="locationConsentModalLabel">Allow Location</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								This application requires access to your location.
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Deny</button>
								<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.getLocation}>Allow</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	getLocation = () => {
		let _this = this;
		if (navigator.geolocation) {
			let geo = {};
			navigator.geolocation.getCurrentPosition(function(position) {
				geo = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				_this.props.setLocation(geo);
			});
		} else {
			alert("Sorry, this browser does not support geolocation!");
		}
	}
}