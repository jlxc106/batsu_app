import React, { Component } from 'react';
import axios from 'axios';
import Timer from './timer';
import EventsListItems from './list_item';
import { connect } from 'react-redux';
import Maps from './event_marker';
import ListOfAttendees from './listOfAttendees';
import images from './rendering_profile';
import {storeLocation} from '../actions/index';
import {bindActionCreators} from 'redux';

class CreatedEvent extends Component{
    constructor(props){
        super(props);

        this.pageLoaded = false;
        this.token = document.cookie.split("=")[1];
        this.timer_id = null;
        this.current_time = null;

        this.state = {
            secondsUntilEvent: null,
            error_loading_page: false,
            eventID: null,
            enableCheckIn: false,
            list: {
                eventName: '',
                eventDateTime: '',
                eventinvitees: [{
                    isCreator: false,
                    fName: '',
                    lName: '',
                    account_ID: '',
                    status: '',
                    path: ''
                }],
                myStatus: "",
                eventPunishment: "",
                eventAddress: "",
                eventDescription: "",
                eventLat: "",
                eventLong: ""
            }
        }
    }

    calculate_distance(){
        if(this.props.lat === 0){
            return 0;
        }
        let lat1=parseFloat(this.state.list.eventLat);
        let lon1=parseFloat(this.state.list.eventLong);
        const R = 6371; 
        let dLat = this.deg2rad(this.props.lat-lat1);
        let dLon = this.deg2rad(this.props.lng-lon1);
        let a = Math.pow(Math.sin(dLat/2), 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(this.props.lat)) * Math.pow(Math.sin(dLon/2), 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        return d;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    updateCheckIn(update_status){
        // const userInfo = {"token": this.token, "eventID": this.state.eventID, "myStatus": this.state.list.myStatus};
        if(this.state.secondsUntilEvent <= 3600){
            const userInfo = {"token": this.token, "eventID": this.state.eventID, "myStatus": update_status};
            axios.post('https://jayclim.com/php/form.php?operation=checkIn', userInfo).then((resp) => {
                if(resp.data.success === true){
                    this.setState({list:{...this.state.list, myStatus: resp.data.data[0]}});
                }
                else{
                    console.error(resp.data.errors);
                }
            })
        }
        else{
            console.log("can't check-in until 1hr before event time")
        }
    }

    handleAxios(){
        axios.get('https://jayclim.com/php/form.php?operation=eventinfo&eventID='+this.state.eventID+"&token="+this.token).then((resp) => {
            if(resp.data.success){
                this.pageLoaded = true;
                this.current_time = new Date(`${resp.data.timestamp} UTC`);
                this.setState({
                    list: resp.data.data
                }, ()=>{
                    this.setState({
                        secondsUntilEvent: (new Date(this.state.list.eventDateTime).getTime() - this.current_time.getTime())/1000
                    })
                    //this.state.secondsUntilEvent = (new Date(this.state.list.eventDateTime).getTime() - this.current_time.getTime())/1000;
                })
            }
            else{
                console.error(resp.data.errors);
            }
        });
    }

    componentWillMount(){
        try{
            this.setState({
                eventID: Number(this.props.location.state.id)
            }, this.handleAxios);
            this.props.storeLocation();
            
        }
        catch(error){
            console.error(error);
            this.setState({
                error_loading_page: true
            });
        }
    }

    componentDidUpdate(){
        /*
        Note: only watch user location when event is about to start
        */
        //if user is not within range to checkin - keep calling every 30 sec
        if(this.state.secondsUntilEvent <= 3600 && this.state.secondsUntilEvent){ //1 hr prior to event
            if(!this.state.enableCheckIn && this.calculate_distance() < ( this.props.accuracy < 500 ? this.props.accuracy/1000: 0.5)){ 
                this.setState({
                    enableCheckIn: true
                })
            }
            else if(this.timer_id === null){
                this.timer_id = setInterval(()=>{this.props.storeLocation()}, 30000); //watch user location
            }
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer_id);
    }

    render(){
        if(this.state.error_loading_page){
            return(
                <h1 className="preview_loading">Invalid event page, access from list of events page</h1>
            )
        }
        else if(!this.state.eventID){
            return(
                <h1 className="preview_loading">Page Loading...</h1>
            )
        }
        else{
            const eventLocation ={
                lat:parseFloat(this.state.list.eventLat),
                lng:parseFloat(this.state.list.eventLong)
            }

            let check_in_div = <div>Not within Check-In Distance</div>;
            if(this.state.list.myStatus === 'Checked In'){
                check_in_div = <div>Checked-In</div>
            }
            else if(this.state.secondsUntilEvent > 3600 && this.state.secondsUntilEvent){
                check_in_div = <div>Check-in enabled 1 hr prior to event</div>;
            }
            else if(this.state.enableCheckIn === true){
                check_in_div = <div><button className="btn btn-primary" onClick={()=>{this.updateCheckIn('Checked In')}}>Check-In</button></div>
            }

            let PermissionMsg = "";

            if(this.props.showPermissionMsg){
                PermissionMsg = "Enable Geolocation for accurate results";
            } 

            return (
                <div>
                    {this.state.list.eventName}
                    <h6>Event Address</h6>
                    {this.state.list.eventAddress}
                    <h6>Time Until Event</h6>
                    {this.state.list.eventDateTime}
                    <Timer eventTime={new Date(this.state.list.eventDateTime).getTime()} eventID={this.state.eventID}/>
                    <div className="line_space"></div>
                    <div>list of invitees</div>
                    <div className="friends_picture_container">
                        <ListOfAttendees eventinvitees={this.state.list.eventinvitees} />
                    </div>
                    <div className="line_space"></div>
                    <div className="punishment_div">Punishment</div>
                    <div>{this.state.list.eventPunishment}</div>
                    <div id="eventmap">
                        <Maps
                            radius = {this.props.accuracy < 500 ? this.props.accuracy: 500}
                            position = {eventLocation}
                            containerElement={<div style={{ height: `24vh` , width: `90vw`,display:`inline-block`}} />}
                            mapElement={<div style={{ height: `24vh` , width: `90vw`}} />}
                            markers={[eventLocation, {lat: this.props.lat, lng: this.props.lng}]}
                        />
                    </div>
                    {check_in_div}
                    <div>{PermissionMsg}</div>
                </div>
            )
        }
    }
}


function mapStateToProps(state){
    if(state.userLocation.lat){
        return {lng: state.userLocation.lng, lat: state.userLocation.lat, accuracy: state.userLocation.accuracy, showPermissionMsg: state.userLocation.showPermissionMsg};
    }
    return {lng: 0, lat: 0, accuracy: 0, showPermissionMsg: false};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({storeLocation},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatedEvent);