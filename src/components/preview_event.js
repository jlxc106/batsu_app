import React, { Component } from 'react';
import Maps  from './event_marker';
// import List from './list_of_events';

class CreatedEvent extends Component{
      constructor(props){
        super(props);

        this.state = {
            eventID: 30,
            list: {
                eventName: 'gym time',
                eventDateTime: 'may 3rd',
                eventinvitees: [{
                    isCreator: false,
                    fName: '',
                    lName: '',
                    account_ID: ''
                }],
                eventAddress: "1234 irvine center blvd, irvine, CA 28932",
                eventDescription: "",
                eventLat: "33.689509",
                eventLong: "-117.881435"
            }
        }
    }
    handleCheckIn(e){
        e.preventDefault();
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
 


    render(){
        const eventLocation ={
            lat:parseFloat(this.state.list.eventLat),
            lng:parseFloat(this.state.list.eventLong)
        }
        console.log(eventLocation);
        return (
            <form className="after_creating_event" onSubmit={(e) => this.handleCheckIn(e)}>
                <h1>{this.state.list.eventName}</h1>
                <h3>{this.state.list.eventDateTime}</h3>
                <h3>12:32:22</h3>
                <h5>{this.state.list.eventAddress}</h5>
                <div className="line_space"></div>
                <div>list of invitee</div>
                <div className="friends_picture_container">
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                    <img src="http://www.tippanii.com/images/noprofile.png" alt=""/>
                </div>
                <div className="line_space"></div>
                <div className="punishment_div">Punishment</div>
                <div>pushups 100 times</div>
               
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
            </form>
        )
    }
}

export default CreatedEvent;