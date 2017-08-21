import React, { Component } from 'react';
import axios from 'axios';
import './app.css';
// import NavBar from './nav_bar';



class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            canEdit:false,
            token: document.cookie.split("=")[1],
            file:{
                name: ''
            },
            imagePreviewUrl:'',
            userData:{
                file:'',
                fname: '',
                lname: '',
                phone: '',
                email: ''
            }
        }
    }

    handleAxios(){
        // console.log(this.state);
        axios.get('http://localhost/Website/accountability_db/c5.17_accountability/php/getData.php?operation=profile&token='+document.cookie.split('=')[1]).then((resp) => {
            // console.log(resp);
            this.setState({userData: resp.data.data});
            this.setState({imagePreviewUrl: 'http://localhost/Website/accountability_db/c5.17_accountability/php' + resp.data.path.imagePreviewUrl.substr(1)});
        })
    }

    componentWillMount(){
        this.handleAxios();
    }

    // handleChange(event){
    // // handleChange(){
    //     const{name, value} = event.target;
    //     const{userData} = this.state;
    //     userData[name] = value;
    //     this.setState({userData:{...userData}});
    // }


    //axios call needed to upload image
    postPic(event){
        event.preventDefault();
        let filepic = this.state.file;
        const formData = new FormData();
        formData.append('profile', filepic);
        formData.append('token', this.state.token);
        // const sendThisShit = {"formData": formData, "token" : this.state.token};
        console.log(formData);
        axios.post('http://localhost/Website/accountability_db/c5.17_accountability/php/form.php?operation=uploadImage&token='+ this.state.token, formData).then((resp) => {
            console.log('Axios call update profile resp: ', resp)

        })
    }

    handleImageChange(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file)
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log('Uploading', this.state);
        this.setState({
            canEdit:false
        })
        this.postPic(event);
    }


    render() {

        if(this.state.canEdit === false){
            return (
                <div>
                    {/* <NavBar/> */}
                    <h1 className="card-title">Profile</h1>
                    <div className="card profile_parent">
                        <div className="profile_picture_preview">

                            <img src={this.state.imagePreviewUrl} alt=""/>
                        </div>
                        <div className="card-block">
                            <ul className="list-group list-group-flush container">
                                <li className="list-group-item">Email: {this.state.userData.email}</li>
                                <li className="list-group-item">Name: {this.state.userData.fname.concat(" ").concat(this.state.userData.lname)}</li>
                                <li className="list-group-item">Phone: {this.state.userData.phone}</li>
                            </ul>
                        </div>
                        <button onClick={() => this.setState({canEdit: true})} className="btn btn-danger profile_button">Edit</button>

                    </div>
                </div>
            )
        } else {
            let {imagePreviewUrl, userData} = this.state;
            let profilePic = null;
            if (imagePreviewUrl) {
                profilePic = (<img src={imagePreviewUrl}/>);
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
                                    {/* <li className="list-group-item">Email: {userData.email}</li> */}
                                    <li className="list-group-item">Email: {this.state.userData.email}</li>
                                    <li className="list-group-item">Name: {this.state.userData.fname.concat(" ").concat(this.state.userData.lname)}</li>
                                    <li className="list-group-item">Phone: {this.state.userData.phone}</li>
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

export default Profile;