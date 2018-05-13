import React, { Component } from 'react';
import axios from 'axios';
import ListOfEvents from './list_of_events';
import {connect} from 'react-redux';
import _ from 'lodash';

class EventList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        if(_.isEmpty(this.props.events)) {
            return (
                <div className="my_events_loading"> Loading....</div>
            )
        } else {
            return (
                <div>
                    <h1 className="myEvents_title">My Events</h1>
                    {/* <h3 className="myEvents_subtitle">All of Your Events in One Place!</h3> */}

                    <h4 className="events_box_title">Created Events</h4>
                    <div className="events_box">
                        <ListOfEvents className="list_info" eventsList={this.props.events.createdEvents} />
                    </div>
                    <h4 className="events_box_title">Invited Events</h4>
                    <div className="events_box">
                        <ListOfEvents className="list_info" eventsList={this.props.events.invitedEvents} />
                    </div>
                </div>
            )
        }  
    }
}


function mapStateToProps(state){
    return {events: state.userInfo.events};
}

export default connect(mapStateToProps)(EventList);