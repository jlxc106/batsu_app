import React from 'react';


const Invitee = (props) => {
    const {item} = props;
    // const itemPath = ""+item.path.substr(1);
    const itemPath = "/poop.png";
    return (
        <div className="attendee_img_contain">
            <img className="attendee_pic" src={itemPath} alt=""/>
            <p>{item.fName}</p>
        </div>
    )
}
export default Invitee;
