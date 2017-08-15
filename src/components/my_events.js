import React, { Component } from 'react';
import axios from 'axios';
import List from './list';
import ListTwo from './list_two';
import './app.css';

const BASE_URL = 'http://localhost/Website/accountability_db/c5.17_accountability/form.php?operation=insertEvent';
//will change based on server database

class MyEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            createdEventsList: {
                event_name: '',
                creator_id:'',
                event_id:'',
                event_dateTime:''
            },
            invitedEventsList: {
                event_name:'',
                creator_id:'',
                event_id:'',
                event_dateTime:''
            }
            //will change based on server database
        }
    }

    componentWillMount(){
        this.getData();
    }

    getData(){
        axios.get(`${BASE_URL}`).then((resp) => {
            //will change based on server database
            console.log('this is the response:', resp);
            this.setState({
                createdEventsList: resp.data.todos,
                invitedEventslist: resp.data.todos
            })
        });
    };

    render(){
        return (
            <div>
                <h1 className="myEvents_title">My Events</h1>
                <h3 className="myEvents_subtitle">All of Your Events in One Place!</h3>
                <h4 className="events_box_title">My Created Events</h4>
                <div className="my_created_events_box">
                    <List className="list_info" createdEventsList={this.state.createdEventsList} />
                    {/* //will change based on server database */}
                </div>
                <h4 className="events_box_title">Other Created Events</h4>
                <div className="other_created_events_box">
                    <ListTwo className="list_info" invitedEventsList={this.state.invitedEventsList} />
                    {/* //will change based on server database */}
                </div>
            </div>
        )
    }
}
export default MyEvents;