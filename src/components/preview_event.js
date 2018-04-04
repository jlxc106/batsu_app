import React, { Component } from 'react';
import axios from 'axios';
import Timer from './timer';
import EventsListItems from './list_item';
import { connect } from 'react-redux';
import Maps from './event_marker';
import ListOfAttendees from './listOfAttendees';
import images from './rendering_profile';


class CreatedEvent extends Component{
    constructor(props){
        super(props);

        this.checkedIn = false;
        this.pageLoaded = false;
        this.nav_geo_id = null;
        this.token = document.cookie.split("=")[1];

        this.state = {
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

        this.onArrival = this.onArrival.bind(this);
        this.calculate_distance = this.calculate_distance.bind(this);
    }


    checkInUser() {
        // var id = navigator.geolocation.watchPosition(onArrival, );

     if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.getUser.bind(this));
        } else {
           console.log("Geolocation is not supported by this browser.");
        }
    }


    calculate_distance(position){
        let lat1=parseFloat(this.state.list.eventLat);
        let lon1=parseFloat(this.state.list.eventLong);
        let lat2=position.coords.latitude;
        let lon2=position.coords.longitude;

        const R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2-lon1);
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = (R * c)/0.0003048; // Distance in km
        console.log("distance: ",d);
        return d;
    }

    getUser(position) {
        let lat1=parseFloat(this.state.list.eventLat);
        let lon1=parseFloat(this.state.list.eventLong);
        let lat2=position.coords.latitude;
        let lon2=position.coords.longitude;

        const R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        let dLon = this.deg2rad(lon2-lon1);
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = (R * c)/0.0003048; // Distance in km
        if(d<200){
            console.log('you are within range');
            if(this.state.myStatus === "Checked In"){
                console.log("you're already checked in");
            }
            else{
                const object = {"token": this.token, "eventID": this.state.eventID, "myStatus": this.state.list.myStatus};
                axios.post('http://jayclim.com/php/form.php?operation=checkIn', object).then((resp) => {
                    if(resp.data.success === true){
                        this.setState({myStatus: 'Checked In'});
                        console.log("You Checked in");
                    }
                })
            }
        }else if(d>=200){
            console.log('your out of range');
        }
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
    }

  

    // getImage(path) {
    //     let imagesKeys = Object.keys(images);
    //     let imageUrl = images['example_profile.png']; //
    //     if(!path) {return imageUrl;}
    //     for(let i = 0; i < imagesKeys.length; i++) {
    //         if(`upload_images/${imagesKeys[i]}` === path) {
    //             imageUrl = images[imagesKeys[i]];
    //         }
    //     }
    //     return imageUrl;
    // }

    handleAxios(){
        axios.get('http://jayclim.com/php/getData.php?operation=eventinfo&eventID='+this.state.eventID+"&token="+this.token).then((resp) => {
            if(resp.data.data.myStatus === "Attending"){
                this.checkedIn = true;
            }
            this.pageLoaded = true;
            this.setState({
                list: resp.data.data
            })
        });
    }

    onArrival(userPosition){
        console.log("user position: ",userPosition);
        if(this.calculate_distance(userPosition) < 200){
            console.log("within some distance from event location");
            this.setState({
                enableCheckIn: true
            });
            navigator.geolocation.clearWatch(this.nav_geo_id);
        }
    }

    userPosition_error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    watchPos_setting = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
    }


    componentWillMount(){
        let url = location.pathname;
        let fields = url.split('/');
        let id = parseInt(fields[2]);
        this.setState({
            eventID:id
        }, this.handleAxios);

        this.nav_geo_id = navigator.geolocation.watchPosition(this.onArrival, this.userPosition_error, this.watchPos_setting);
    }

    render(){
        console.log("state: ",this.state);
        if(!this.state.eventID){
            return(
                <h1 className="preview_loading">Page Loading...</h1>
            )
        }
        else{
            const eventLocation ={
                lat:parseFloat(this.state.list.eventLat),
                lng:parseFloat(this.state.list.eventLong)
            }
            const invitee = this.state.list.eventinvitees[0];

            let check_in_div = <div>Not within Check-In Distance</div>;
            if(this.state.list.myStatus === 'Attending'){
                check_in_div = <div>Checked-In</div>
            }
            else if(this.state.enableCheckIn === true){
                check_in_div = <button className="btn btn-primary" onClick={()=>{this.checkInUser()}}>Check-In</button>
            }
            return (
                <div>
                    {this.state.list.eventName}
                    <h6>Time Until Event</h6>
                    {this.state.list.eventDateTime}
                    <Timer eventID={this.state.eventID}/>
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
                            center={eventLocation}
                            position = {eventLocation}
                            containerElement={<div style={{ height: `24vh` , width: `90vw`,display:`inline-block`}} />}
                            mapElement={<div style={{ height: `24vh` , width: `90vw`}} />}
                            markers={[{
                                position: eventLocation,
                            }]}
                        />
                    </div>
                    {check_in_div}
                </div>
            )
        }
    }
}

export default CreatedEvent;


//want: 1) to pass props using Link
//      2) to clean up comp state
//      3) to utilize connect and mapDispatchToProps 