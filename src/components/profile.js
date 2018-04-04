import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {updateProfilePic} from '../actions/index';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            canEdit : false,
            imagePreviewUrl: null,
            file:{
                name: ''
            }
        }
    }

    handleImageChange(event) {
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
        this.setState({
            canEdit:false
        })
        if(this.state.imagePreviewUrl){
            event.preventDefault();
            let filepic = this.state.file;
            const formData = new FormData();
            formData.append('profile', filepic);
            this.props.updateProfilePic(formData);
        }
    }


    render() {
        if(_.isEmpty(this.props.profile)){
            return <div>Loading...</div>
        }
        let image_src = 'http://www.jayclim.com/php' + this.props.profile.path.substr(1);
        if(this.state.canEdit === false){
            return (
                <div>
                    <h1 className="card-title">Profile</h1>
                    <div className="card profile_parent">
                        <div className="profile_picture_preview">
                            <img className="profile_picture" src= {image_src} alt=""/>
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
            let profilePic = null;
            if (this.state.imagePreviewUrl) {
                profilePic = (<img className="profile_picture" src={this.state.imagePreviewUrl} alt="Please select an Image for Preview"/>);
            } else {
                profilePic = (<img className="profile_picture" src={image_src} alt="Please select an Image for Preview"/>);
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

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateProfilePic},dispatch);;
}

function mapStateToProps(state){
    return {profile: state.userInfo.profile};
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);