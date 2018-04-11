import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { postNewEvent, clearErrors } from '../actions/index'
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { renderInput } from './render_input';

class CreateEventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.props.clearErrors();
    }

    handleChange(event){
        this.setState({address: event})
    }

    submitForm(vals){
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0])) 
            .then(latLng=>{
                vals.location = latLng;
                vals.address = this.state.address
                vals.token = document.cookie.split("=")[1]
                this.props.postNewEvent(vals);
                this.props.exitEventForm();

            })

    }

    render() {
        let {handleSubmit, errors} = this.props;

        const inputProps = {
            value : this.state.address,
            onChange: this.handleChange
        };

        if(errors === undefined){
            errors = [];
        }
        return (
            <div className="event_modal container">
                <h1>Event</h1>
                <div className="modal-body">

                {/* non-redux-form method */}
                    {/* <form onSubmit={(event) => {this.handleFormSubmit(event)}}>
                        <div className="form-group row">
                            <label>Event Name</label>
                            <input name="event_name" value={event_name}
                                   onChange={(event) => this.handleChange(event)} maxLength={25} type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Invite Poeple</label>
                            <input name="invitee" value={invitee}
                                   onChange={(event) => this.handleChange(event)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Time</label>
                            <input name="time" value={time} onChange={(event) => this.handleChange(event)}
                                   type="time" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Date</label>
                            <input name="date" value={date}
                                   onChange={(event) => this.handleChange(event)} type="date" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label>Location</label>
                            <PlacesAutocomplete inputProps={inputProps}/>
                        </div>
                        <div className="form-group row">
                            <label>description</label>
                            <input name="description" value={description} maxLength={140}
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
                        <button type="submit" className="btn btn-outline-success">Confirm</button>
                        <button type="button" className="btn btn-outline-danger mr-2" onClick={this.props.exitEventForm}>
                            Cancel
                        </button>
                    </form> */}


                    <form onSubmit={handleSubmit(vals => this.submitForm(vals))}>
                        <div className="form-group row event-input">
                            <label>Event Name*</label>
                            <Field className="form-control" name="event_name" type="text" component={renderInput}/>
                        </div>
                        <div className="form-group row event-input">
                            <label>Invite People</label>
                            <Field className="form-control" name="invitee" type="text" component={renderInput} />
                        </div>
                        <div className="form-group row event-input">
                            <label>Time*</label>
                            <Field className="form-control" name="time" type="time" component={renderInput} />
                        </div>
                        <div className="form-group row event-input">
                            <label>Date*</label>
                            <Field className="form-control" name="date" type="date" component={renderInput} />
                        </div>
                        <div className="form-group row event-input">
                            <label>Address*</label>
                            <PlacesAutocomplete className="form-control" inputProps={inputProps}/>
                        </div>
                        <div className="form-group row event-input">
                            <label>description</label>
                            <Field className="form-control" name="description" type="text" component={renderInput} />
                        </div>
                        <div className="form-group row event-input">
                            <label>Punishment*</label>
                            <Field className="form-control" name="punishment" component="select">
                                <option value="50 Push-ups">50 Push-ups</option>
                                <option value="Buy Winners Lunch">Buy Winners Lunch</option>
                                <option value="Eat a Jar of Mayo">Eat a Jar of Mayo</option>
                                <option value="No Punishment">No Punishment</option>
                            </Field>
                        </div>
                        <ul className="text-danger list-group">
                        {
                            errors.map((error_msg, index)=>{
                                if(error_msg){
                                    return(
                                        <li key={index}>{error_msg}</li>
                                    );
                                }
                            })
                        }                        
                        </ul>
                        <button type="submit" className="btn btn-outline-success">Confirm</button>
                        <button type="button" className="btn btn-outline-danger mr-2" onClick={this.props.exitEventForm}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

function validate(vals){
    const error ={};

    if(!vals.event_name){
        error.event_name ="please enter an event name"
    }
    if(!vals.time){
        error.time = "pleae enter an event time"
    }
    if(!vals.date){
        error.date = "please enter an event date";
    }
    if(!vals.punishment){
        error.punishment = "please select a punishment"
    }
    return error;
}


function mapStateToProps(state){
    return{
        errors: state.userInfo.error
    }
}


export default reduxForm({
    form: 'event_creation',
    validate
    })(connect (mapStateToProps, {postNewEvent, clearErrors})(CreateEventForm));