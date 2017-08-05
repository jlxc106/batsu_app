import React from 'react';
import './app.css';


const FaceBook = () => {
    console.log("facebook button working");
}

const DropDownForm = () => {
    return(
        /*<div className="dropdown">*/
            <button className="fb_button_outer" onClick={FaceBook}></button>
            /*<button className="drop_menu_button btn btn-danger dropdown-toggle" type="button" data-toggle="dropdown" id="dropdownMenu2" aria-haspopup="true" aria-expanded="false">Log In Options</button>*/
            /*<div className="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenu2">*/
                /*<button className="dropdown-item" type="button">Facebook</button>*/
                /*<button className="dropdown-item" type="button">Google</button>*/
            /*</div>*/
        // </div>
    )
}

export default DropDownForm;