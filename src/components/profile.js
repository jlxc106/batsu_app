import React, { Component } from 'react';
// import NavBar from './nav_bar';
import './app.css';
class Profile extends Component {
    render() {
        return (
            <div>
                {/* <NavBar /> */}
                <div>
                    <h1 className="card-title">Profile</h1>
                    <div className="card">
                        <img className="card-img-top" src="http://www.tippanii.com/images/noprofile.png"/>
                        <form enctype="multipart/form-data">
                            Select image to upload:
                            <input type="file" name="fileToUpload" id="fileToUpload" />
                            <input type="submit" value="Upload File" name="submit"></input>
                        </form>
                        <div className="card-block">
                            <ul className="list-group list-group-flush container">
                                <li className="list-group-item">mail@mail.com</li>
                                <li className="list-group-item">FName LName</li>
                                <li className="list-group-item">123-123-1234</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;