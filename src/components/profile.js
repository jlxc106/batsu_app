import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import _ from 'lodash';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            canEdit : false,
            imagePreviewUrl: '',
            file:{
                name: ''
            }
        }
    }

    handleImageChange(event) {
        console.log("event: ", event);
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file)
    }

    handleSubmit(event) {
        console.log("event: ",event);
        event.preventDefault();
        this.setState({
            canEdit:false
        })
        let filepic = this.state.file;
        const formData = new FormData();
        formData.append('profile', filepic);
        // const sendThisShit = {"formData": formData, "token" : this.state.token};
        console.log(formData);
        axios.post('http://jayclim.com/php/form.php?operation=uploadImage&token='+ document.cookie.split("=")[1], formData).then((resp) => {
            console.log('Axios call update profile resp: ', resp)

        })
    }


    render() {
        if(_.isEmpty(this.props.profile)){
            return <div>Loading...</div>
        }
        console.log("profile: ",this.props.profile);
        if(this.state.canEdit === false){
            return (
                <div>
                    <h1 className="card-title">Profile</h1>
                    <div className="card profile_parent">
                        <div className="profile_picture_preview">
                            <img className="profile_picture" src={this.state.imagePreviewUrl} alt=""/>
                        </div>
                        <div className="card-block">
                            <ul className="list-group list-group-flush container">
                                <li className="list-group-item">Email: {this.props.profile.email}</li>
                                <li className="list-group-item">Name: {this.props.profile.fname.concat(" ").concat(this.props.profile.lname)}</li>
                                <li className="list-group-item">Phone: {this.props.profile.phone}</li>
                            </ul>
                        </div>
                        <button onClick={() => this.setState({canEdit: true})} className="btn btn-danger profile_button">Edit</button>
                    </div>
                </div>
            )
        } else {
            let {imagePreviewUrl} = this.state;
            let profilePic = null;
            if (imagePreviewUrl) {
                profilePic = (<img className="profile_picture" src={imagePreviewUrl}/>);
            } else {
                profilePic = (<div className="previewText">Please select an Image for Preview</div>);
            }
            return (
                <div>
                    <h1 className="card-title">Profile</h1>
                    <div className="card profile_parent">
                        <div className="profile_picture_preview">
                            {profilePic}
                        </div>
                        <form onSubmit={(e) => {this.handleSubmit(e)}}>
                            <input id="file" className="profileInput" type="file" name="profile" onChange={(e)=>this.handleImageChange(e)}/>
                            <div className="card-block">
                                <ul className="list-group list-group-flush container">
                                    <li className="list-group-item">Email: {this.props.profile.email}</li>
                                    <li className="list-group-item">Name: {this.props.profile.fname.concat(" ").concat(this.props.profile.lname)}</li>
                                    <li className="list-group-item">Phone: {this.props.profile.phone}</li>
                                </ul>
                            </div>
                            <button type="button" onClick={(e) => this.handleSubmit(e)} className="btn btn-info profile_button">Save</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    console.log("state: ", state);
    return {profile: state.userInfo.profile};
}


export default connect(mapStateToProps)(Profile);