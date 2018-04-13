import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import { postNewEvent } from "../actions/index";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { renderInput, renderInput_invitee } from "./render_input";

class CreateEventForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			address: "",
			address_input_msg: ""
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ address: event });
	}

	submitForm(vals) {
		//default values for optional fields
		if (!vals.description) {
			vals.description = "";
		}
		if (!vals.punishment) {
			vals.punishment = "No Punishment";
		}
		if (!vals.invitee) {
			vals.invitee = "";
		}
		if (this.state.address) {
			geocodeByAddress(this.state.address)
				.then(results => getLatLng(results[0]))
				.then(latLng => {
					vals.location = latLng;
					vals.address = this.state.address;
					vals.token = document.cookie.split("=")[1];
					if (vals.location) {
						this.props.postNewEvent(vals);
						this.props.exitEventForm();
					} else {
						this.setState({ address_input_msg: "enter valid address" });
					}
				});
		} else {
			this.setState({ address_input_msg: "no address" });
		}
	}

	render() {
		let { address_input_msg } = this.state;
		let { handleSubmit } = this.props;

		const inputProps = {
			value: this.state.address,
			onChange: this.handleChange
		};

		return (
			<div className="event_modal container">
				<h1>Event</h1>
				<div className="modal-body">
					<form onSubmit={handleSubmit(vals => this.submitForm(vals))}>
						<div className="form-group row event-input">
							<label>
								Event Name<span className="text-danger">*</span>
							</label>
							<Field
								className="form-control"
								name="event_name"
								type="text"
								component={renderInput}
								label="Event Name"
							/>
						</div>
						<div className="form-group row event-input">
							<label>Invite People</label>
							<Field
								className="form-control"
								name="invitee"
								type="text"
								component={renderInput_invitee}
								label="invitee"
							/>
						</div>
						<div className="form-group row event-input">
							<label>
								Time<span className="text-danger">*</span>
							</label>
							<Field
								className="form-control"
								name="time"
								type="time"
								component={renderInput}
								label="Time"
							/>
						</div>
						<div className="form-group row event-input">
							<label>
								Date<span className="text-danger">*</span>
							</label>
							<Field
								className="form-control"
								name="date"
								type="date"
								component={renderInput}
								label="Date"
							/>
						</div>
						<div className="form-group row event-input">
							<label>
								Address<span className="text-danger">*</span>
							</label>
							<PlacesAutocomplete
								className="form-control"
								inputProps={inputProps}
							/>
							<ul className="text-danger list-group">
								<li>{address_input_msg}</li>
							</ul>
						</div>
						<div className="form-group row event-input">
							<label>description</label>
							<Field
								className="form-control"
								name="description"
								type="text"
								label="Description"
								component={renderInput}
							/>
						</div>
						<div className="form-group row event-input">
							<label>
								Punishment<span className="text-danger">*</span>
							</label>
							<Field
								className="form-control"
								name="punishment"
								component="select"
								label="Punishment"
							>
								<option value="No Punishment">No Punishment</option>
								<option value="50 Push-ups">50 Push-ups</option>
								<option value="Buy Winners Lunch">Buy Winners Lunch</option>
								<option value="Eat a Jar of Mayo">Eat a Jar of Mayo</option>
							</Field>
						</div>
						<button type="submit" className="btn btn-outline-success">
							Confirm
						</button>
						<button
							type="button"
							className="btn btn-outline-danger mr-2"
							onClick={this.props.exitEventForm}
						>
							Cancel
						</button>
					</form>
				</div>
				<div>
					<span className="text-danger">*</span> required
				</div>
			</div>
		);
	}
}

function validate(vals) {
	const error = {};

	if (vals.date && vals.time) {
		let event_dt = new Date(vals.date + " " + vals.time);
		if (event_dt < new Date()) {
			error.date = "enter valid date and time";
		}
	}
	if (!vals.event_name) {
		error.event_name = "please enter an event name";
	}
	if (!vals.time) {
		error.time = "pleae enter an event time";
	}
	if (!vals.date) {
		error.date = "please enter an event date";
	}
	return error;
}

export default reduxForm({
	form: "event_creation",
	validate
})(connect(null, { postNewEvent })(CreateEventForm));
