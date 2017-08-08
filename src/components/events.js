import React, { Component } from 'react';
import axios from 'axios';

class Events extends Component {
    constructor(props){
        super(props);

        this.state = {
            eventForm: {
                creator_name:'',
                event_name: 'event nameu',
                invitee: '1, 2, 3, 4',
                time: '',
                date: '',
                location: 'test location',
                address: 'test address',
                description: 'descriptionnnnn',
                punishment: 'profile_doodle'
            }
        }
    }
    handleChange(e){
        console.log('event',e.target);
        const { value,name } = e.target;
        const { eventForm }  = this.state; //this changed from {form} to form
        eventForm[name] = value;
        this.setState({
            eventForm: {...eventForm}
        });
    }
    addEvent(e){
        e.preventDefault();
        const { eventForm } = this.state;
        console.log("Form submitted", eventForm);
        this.setState({ //resetting form to blank
            eventForm: {
                creator_name: '',
                event_name: '',
                invitee: '',
                time: '',
                date: '',
                location: '',
                address: '',
                description: '',
                punishment: ''
            }
        });
        this.handleAxiosEvent();
    }
    handleAxiosEvent(){
        const {eventForm} = this.state;
        console.log("event form:",eventForm);
        axios.post(`http://localhost/Website/accountability_db/c5.17_accountability/form.php?operation=insertEvent`, eventForm).then((resp) => {
            console.log('this is the response of event from insert:', resp);
        })
    }
    render() {
        const {eventForm} = this.state;
        return (
            <div className="event_modal container">
                <h1>Event</h1>
                <div className="modal-body">
                    <form>
                        <div className="form-group row">
                            <input placeholder="name" name="event_name" value={eventForm.event_name}
                                   onChange={(e) => this.handleChange(e)} maxLength={25} type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <input placeholder="invite people" name="invitee" value={eventForm.invitee}
                                   onChange={(e) => this.handleChange(e)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <input name="time" value={eventForm.time} onChange={(e) => this.handleChange(e)}
                                   type="time" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <input placeholder="date" name="date" value={eventForm.date}
                                   onChange={(e) => this.handleChange(e)} type="date" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <input placeholder="Search for a place" name="location" value={eventForm.location}
                                   onChange={(e) => this.handleChange(e)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <input placeholder="Input address" name="address" value={eventForm.address}
                                   onChange={(e) => this.handleChange(e)} type="text" className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <input placeholder="description" name="description" value={eventForm.description}
                                   maxLength={140} onChange={(e) => this.handleChange(e)} type="text"
                                   className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <select className="form-control" name="punishment" value={eventForm.punishment} onChange={(e) => this.handleChange(e)}>
                                <option value="profile_doodle">Doodle on Profile Pic</option>
                                <option value="facebook_post">Facebook Post</option>
                                <option value="No Punishment">No Punishment</option>
                            </select>
                        </div>
                    </form>
                    <button type="button" className="btn btn-outline-danger mr-2" onClick={this.props.onCancel}>Cancel</button>
                    <button type="button" onClick={(e) => this.addEvent(e)} className="btn btn-outline-success">Confirm</button>
                </div>
            </div>
        )
    }
}

export default Events;