import React, { Component } from 'react';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './app.css'
// import NavBar from './nav_bar';

class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                event_name: 'event nameu',
                invitee: '1, 2, 3, 4',
                time: '',
                date: '',
                address: '',
                location:'',
                description: 'descriptionnnnn',
                punishment: 'profile_doodle',
                session_id: document.cookie
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
        console.log('Called handleFormSubmit', this.state.form);
        geocodeByAddress(this.state.form.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.handleAxios(latLng)
            })
            .catch(error => console.error('what is Error', error));
    };
    handleAxios(latLong) {
        console.log("Handle axios latLong:", latLong);

        const {form} = this.state;

        const sendData = {...form, location: latLong};

        const newState = {
            form: {
                name: '',
                event_name: '',
                invitee: '',
                time: '',
                date: '',
                address: '',
                description: '',
                punishment: '',
                session_id: document.cookie
            }
        };
        this.setState(newState);


        console.log('Data to send:', sendData);
        axios.post(`http://localhost/Website/accountability_db/c5.17_accountability/form.php?operation=insertEvent`, sendData).then((resp) => {

            console.log('this is the response:', resp);
            if(resp.data.success === true){
                axios.get(`http://localhost/Website/accountability_db/c5.17_accountability/form.php?operation=insertEvent`).then((resp)=>{
                    let location = {lat:33.6904288,lng:-117.8330699}

                    })
            }
            else{
                //stay at log in page
            }
        });
    };

    render() {
        const inputProps = {
            value: this.state.form.address,
            onChange: this.handleChange
        };
        const {event_name, invitee, time, date, description, punishment} = this.state.form;
        return (

                <div className="event_modal container">
                    <h1 className="event_title">Event</h1>
                    <div className="modal-body">
                        <form onSubmit={(event) => {this.handleFormSubmit(event)}}>
                            <div className="form-group row">
                                <input placeholder="name" name="name" value={name}
                                   onChange={(event) => this.handleChange(event)} maxLength={25} type="text" className="form-control"/>
                            </div>
                            <div className="form-group row">
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
                            <PlacesAutocomplete
                                inputProps={inputProps}/>
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
                                <option value="profile_doodle">Doodle on Profile Pic</option>
                                <option value="facebook_post">Facebook Post</option>
                                <option value="No Punishment">No Punishment</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-success">Confirm</button>
                        <button type="button" className="btn btn-outline-danger mr-2" onClick={this.props.onCancel}>
                            Cancel
                        </button>
                        </form>
                    </div>
                </div>

        )
    }
}

export default Events;