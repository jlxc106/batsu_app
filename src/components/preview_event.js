import React, { Component } from 'react';
// import ListThree from './listThree';
import Maps from './event_marker';
import axios from 'axios';
import './app.css';
import Timer from './timer';
import Pics from './rendering_profile';


class CreatedEvent extends Component{
    constructor(props){
        super(props);


        this.pageLoaded = false;
        this.state = {
            eventID: 18,
            list: {
                eventName: '',
                eventDateTime: '',
                eventinvitees: [{
                    isCreator: false,
                    fName: '',
                    lName: '',
                    account_ID: ''
                }],
                eventPunishment: "",
                eventAddress: "",
                eventDescription: "",
                eventLat: "",
                eventLong: ""
            }
        }
    }

    componentWillMount(){
        this.handleAxios();
    }



    grabUser() {
     if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.getUser.bind(this));
        } else {
           console.log("Geolocation is not supported by this browser.");
        }
    }


    getUser(position) {
        console.log("Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude);
        console.log("This is the state lat/lon", this.state.list);

        let lat1=parseFloat(this.state.list.eventLat);
        let lon1=parseFloat(this.state.list.eventLong);
        let lat2=position.coords.latitude;
        let lon2=position.coords.longitude;


          const R = 6371; // Radius of the earth in km
          let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
          let dLon = this.deg2rad(lon2-lon1);
          let a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          let d = (R * c)/0.0003048; // Distance in km

          if(d<200){
          console.log('you are within range');
            }else if(d>=200){
          console.log('your out of range');
        }
    }

   deg2rad(deg) {
    return deg * (Math.PI/180)
    }





    handleAxios(){
        axios.get('http://localhost/c5.17_accountability/php/getData.php?operation=eventinfo&eventID='+this.state.eventID).then((resp) => {
            console.log('this is the response:', resp);
            this.pageLoaded = true;
            this.setState({
                list: resp.data.data

                //this needs to be based from backend
            })
            console.log("list: ", this.state.list);

        });
    }

    render(){
        if(this.pageLoaded === false){
            return(
                <h1>Page Loading...</h1>
            )
        }
        else{
            const eventLocation ={
                lat:parseFloat(this.state.list.eventLat),
                lng:parseFloat(this.state.list.eventLong)
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
                        <Pics profilePic={this.state.list}/>
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
                    <button className="btn" onClick={()=>{this.grabUser()}}>Check-In</button>
                </div>
            )
        }
    }
}

export default CreatedEvent;


{/*<button className="btn">Arrived</button>*/}