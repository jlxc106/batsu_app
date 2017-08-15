import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import './app.css';


const BASE_URL = "http://localhost/c5.17_accountability/UpdateProfilePic.php"; //http://localhost/c5.17_accountability/form.php?operation=authenticateUser`

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            userData:{
                fname: '',
                lname: '',
                phone: '',
                email: '',
            }
        }
        // this.handleAxios();
    }
    componentWillMount(){
        this.handleAxios();
    }
    handleAxios(){
        // const {form} = this.state;
        // console.log(form);
        console.log(this.state);
        axios.get('http://localhost/Website/accountability_db/c5.17_accountability/php/getData.php?operation=profile&session='+document.cookie).then((resp) => {
            console.log(resp);
            this.setState({userData: resp.data.data});
        })
    }
    postProfAxios(){
        const {userData} = this.userData.profile_pic
        console.log(userData);
        axios.post(`${BASE_URL}`, userData).then((resp) => {
            console.log('Add resp:', resp)
        })
    }
    render() {
        return (
            <div>
                <div>
                    <h1 className="card-title">Profile</h1>
                    <div className="card">
                        <img className="card-img-top" src="http://www.tippanii.com/images/noprofile.png"/>
                        <form encType="multipart/form-data">
                            Select image to upload:
                            <input type="file" name="fileToUpload" id="fileToUpload" />
                            <input type="submit" value="Upload File" name="submit" onClick={this.postProfAxios} />
                        </form>
                        <div className="card-block">
                            <ul className="list-group list-group-flush container">
                                <li className="list-group-item">Email: {this.state.userData.email}</li>
                                <li className="list-group-item">Name: {this.state.userData.fname.concat(" ").concat(this.state.userData.lname)}</li>
                                <li className="list-group-item">Phone: {this.state.userData.phone}</li>
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