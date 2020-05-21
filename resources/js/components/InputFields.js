import React, { Component} from 'react';

export default class InputFields extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pickup: '',
			dropoff: ''
		}

		this.updateField = this.updateField.bind(this);
	}

	updateField = (event) => {
		const target = event.target;

		this.setState({
			[target.name]: target.value
		});
	}

	render() {
		return (
			<div className="fieldContainer">
				<div className="fieldDiv">
					<input
						type='text'
						placeholder="Pickup Address"
						name={pickup}
						onChange={this.updateField()}
					/>
				</div>

				<div className="fieldDiv">
					<input
						type='text'
						placeholder="Dropoff Address"
						name={dropoff}
						onChange={this.updateField()}
					/>
				</div>
			</div>
		)
	}
}