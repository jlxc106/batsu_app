import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { postNewEvent } from '../actions/index'
import { connect } from 'react-redux';

class CreateEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: document.cookie.split("=")[1],
            form: {
                event_name: 'event nameu',
                invitee: 'test_email1@gmail.com, test_email2@gmail.com, test_email4@gmail.com',
                time: '',
                date: '',
                address: '',
                location:'',
                description: '',
                punishment: '50 Push-ups'
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let name = '';
        let value = '';

        if(typeof event === 'string') {
            name = 'address';
            value = event;
        } else {
            name = event.target.name;
            value = event.target.value;
        }

        const {form} = this.state;
        form[name] = value;
        this.setState({form: {...form}});
    }

    handleFormSubmit(event) {
        event.preventDefault();
        geocodeByAddress(this.state.form.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.handleAxios(latLng)
            })
            //.catch(error => console.error('what is Error', error));
    };

    handleAxios(latLong) {
        const {form} = this.state;
        const sendData = {...form, location: latLong, token: this.state.token};
        this.props.postNewEvent(sendData);
        const newState = {
            form: {
                event_name: '',
                invitee: '',
                time: '',
                date: '',
                address: '',
                description: '',
                punishment: ''
            }
        };
        this.setState(newState);
        this.props.exitEventForm();
    };

    render() {
        const inputProps = {
            value: this.state.form.address,
            onChange: this.handleChange
        };
        const {event_name, invitee, time, date, description, punishment} = this.state.form;
        return (
            <div className="event_modal container">
                <h1>Event</h1>
                <div className="modal-body">
                    <form onSubmit={(event) => {this.handleFormSubmit(event)}}>
                        <div className="form-group row">
                            <label>Event Name</label>
                            <input placeholder="name" name="event_name" value={event_name}
                                   onChange={(event) => this.handleChange(event)} maxLength={25} type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Invite Poeple</label>
                            <input placeholder="invite people" name="invitee" value={invitee}
                                   onChange={(event) => this.handleChange(event)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Time</label>
                            <input name="time" value={time} onChange={(event) => this.handleChange(event)}
                                   type="time" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Date</label>
                            <input placeholder="date" name="date" value={date}
                                   onChange={(event) => this.handleChange(event)} type="date" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Location</label>
                            <PlacesAutocomplete inputProps={inputProps}/>
                        </div>
                        <div className="form-group row">
                            <label>description</label>
                            <input placeholder="description" name="description" value={description} maxLength={140}
                                   onChange={(e) => this.handleChange(e)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Punishment</label>
                            <select className="form-control" name="punishment" value={punishment}
                                    onChange={(e) => this.handleChange(e)}>
                                <option value="50 Push-ups">50 Push-ups</option>
                                <option value="Buy Winners Lunch">Buy Winners Lunch</option>
                                <option value="Eat a Jar of Mayo">Eat a Jar of Mayo</option>
                                <option value="No Punishment">No Punishment</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-success">
                            Confirm
                        </button>

                        <button type="button" className="btn btn-outline-danger mr-2" onClick={this.props.exitEventForm}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect (null, {postNewEvent})(CreateEventForm);