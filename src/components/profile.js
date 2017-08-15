import React, { Component } from 'react';
import axios from 'axios';
import './app.css';


class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            canEdit:false,
            file:'',
            imagePreviewUrl:'',
            userData:{
                fname: 'jay',
                lname: 'die',
                phone: '714-234-2333',
                email: 'jaydie@gmail.com'
            }
        }
    }

    handleAxios(){
        console.log(this.state);
        axios.get('http://localhost/Website/accountability_db/c5.17_accountability/php/getData.php?operation=profile&session='+document.cookie).then((resp) => {
            console.log(resp);
            this.setState({userData: resp.data.data});
        })
    }

    componentWillMount(){
        this.handleAxios();
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('Uploading', this.state);
        this.setState({
            canEdit:false
        })
    }


    render() {
        if(this.state.canEdit === false){
            return (
                <div>
                    <h1 className="card-title">Profile</h1>
                    <div className="card profile_parent">
                        <div className="profile_picture_preview">
                            <img src="https://www.biography.com/.image/t_share/MTQ3NjM5ODIyNjU0MTIxMDM0/snoop_dogg_photo_by_estevan_oriol_archive_photos_getty_455616412.jpg" alt=""/>
                        </div>
                        <div className="card-block">
                            <ul className="list-group list-group-flush container">
                                <li className="list-group-item">Email: jaydie@gmail.com</li>
                                <li className="list-group-item">Name: Jay homeless</li>
                                <li className="list-group-item">Phone: 800-888-3333</li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                        <button onClick={() => this.setState({canEdit: true})} className="btn btn-outline-danger">Edit</button>
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
                            {/*{this.state.userData.profile_pic}*/}
                            {profilePic}
                        </div>
                        <form onSubmit={(e) => {this.handleSubmit(e)}}>
                            <input className="profileInput" type="file" name="profile" onChange={(e)=>this.handleImageChange(e)}/>
                            <div className="card-block">
                                <ul className="list-group list-group-flush container">
                                    <li className="list-group-item">Email: {userData.email}</li>
                                    <li className="list-group-item">First Name: <input type="text" value={userData.fname} onChange={(e) => {this.handleInputChange(e)}}/></li>
                                    <li className="list-group-item">Last Name: <input type="text" value={userData.lname} onChange={(e) => {this.handleInputChange(e)}}/></li>
                                    <li className="list-group-item">Phone: <input type="text" value={userData.phone} onChange={(e) => {this.handleInputChange(e)}}/></li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div>
                            <button type="submit" onClick={(e) => this.handleSubmit(e)} className="btn btn-outline-info">Save</button>
                        </form>
                    </div>
                </div>
            )

        }
    }
}


export default Profile;