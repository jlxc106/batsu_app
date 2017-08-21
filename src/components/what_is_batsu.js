import React from 'react';
import './app.css';
import GroupPic from './imgs/group_photo.png';
// import NavBar from './nav_bar';


const HowTo = () => {
    return(
        <div>
            {/* <NavBar /> */}
            <h1 className="howto_title_top">What's Batsu?</h1>
            <h3 className="howto_title_bottom">¯\_(ಠ_ಠ)_/¯</h3>
            <img src={GroupPic} className="howto_group_pic" />
            <div className="howto_inner_text">
                What is Batsu?  <br/>
                Good question!  Batsu is an application that was created from 
                the great mind of Elias Martinez.  After attending multiple events where friends
                would constantly be late, he took it upon himself to gather a team (photo above) that 
                is dedicated to helping the people of the world to no longer be late to their events.  
                Through the application, people can create an event, invite their friends to the new 
                event, set up a time of when to meet, and select a punishment.  The punishment will be 
                saved for the person/people who is/are late to the scheduled event!  Batsu hopes to help 
                create accountability for those who have difficulty keeping their friends, family, and 
                acquaintances accoutable.  Enjoy!
            </div>
        </div>
    )
}

export default HowTo;