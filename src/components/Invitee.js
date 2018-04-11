import React from 'react';


const Invitee = (props) => {
    const {item} = props;
    const profilePic = "http://www.jayclim.com/php" + item.path.substr(1);
    // const itemPath = ""+item.path.substr(1);
    const itemPath = '/poop.png';

    function myfunction(){
        src='/poop.png';
    }
    return (
        <div className="attendee_img_contain">
            <img className="attendee_pic" src={profilePic} alt="image not found" />
            <p>{item.fName}</p>
        </div>
    )
}
export default Invitee;
