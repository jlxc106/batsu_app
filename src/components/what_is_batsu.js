import React from 'react';
import GroupPic from './imgs/group_photo.png';

const HowTo = () => {
    return(
        <div>
            <h1 className="howto_title_top">What's Batsu?</h1>
            <div className="howto_inner_text">
                What is Batsu?  <br/>
                Batsu.io is a web application where friends can keep each other accountable for meet ups.
                Through the application's built in event creation system, you can invite your friends/family your event,
                set up a time/location, and select a punishment. The punishment will be saved for the person/people who are
                late to the scheduled event. Batsu hopes to help create accountability for those who have difficulty remembering 
                key events with friends, family, and acquaintances. Enjoy!
            </div>
        </div>
    )
}

export default HowTo;