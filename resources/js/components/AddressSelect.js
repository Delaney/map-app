import React, { Component } from 'react';
import PredictionList from './PredictionList';
import { Link, withRouter } from 'react-router-dom';

import BackArrow from '../../assets/icons/back.svg';

export default withRouter(class AddressSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bounds: null,
			pickup: '',
			dropoff: '',
			pickupAutocomplete: null,
			predictions: []
		}

		this.initPickup = this.initPickup.bind(this);
		this.updateField = this.updateField.bind(this);
		this.fillInAddress = this.fillInAddress.bind(this);
	}

	componentDidMount() {
		this.initPickup();
	}
	
	render() {
		return(
			<div className="pl-3 pr-3 pt-3">
				<div className="row">
					<Link to="/" className="backLink">
						<span className="backIcon"><img src={BackArrow} /></span>
						Back
					</Link>
					{
						this.props.location.state.pickupType ?
						<h3 className="text-center">Pickup</h3> :
						<h3 className="text-center">Dropoff</h3>
					}
				</div>

				<div className="fieldDiv flex-center">
					<input
						type='text'
						placeholder="Pickup Address"
						name='pickup'
						id='search-input'
						onChange={this.fillInAddress}
					/>	
				</div>

				{
					this.state.predictions.length ?
					<PredictionList predictions={this.state.predictions} appState={this.props.appState} setLocation={this.setLocation} />
					:
					''
				}
			</div>
		)
	}

	initPickup = () => {
		const circle = new google.maps.Circle({
			center: this.props.position,
			radius: 50000,
		});

		this.setState({
			bounds: circle.getBounds()
		});

	}

	fillInAddress = () => {
		const _this = this;
		const displaySuggestions = function(predictions, status) {
			if (status != google.maps.places.PlacesServiceStatus.OK) {
				console.log(status);
				return;
			}

			_this.setState({ predictions: predictions });
		};

		let val = document.getElementById('search-input').value;
		if (val) {
			var service = new google.maps.places.AutocompleteService();
			service.getPlacePredictions({
				input: val,
				bounds: this.state.bounds,
				types: ['address']	
			}, displaySuggestions);
		} else {
			this.setState({ predictions: [] });
		}

	}

	updateField = (event) => {
		const target = event.target;

		this.setState({
			[target.name]: target.value
		});
	}
	
	setLocation = (id) => {
		this.props.setLocation({
			pickup: this.props.location.state.pickupType,
			place_id: id
		});
		this.props.history.replace('/');
	}

	setCurrentAsPickup = (event) => {
		this.props.setLocation(event.target.dataset['name']);
	}
});