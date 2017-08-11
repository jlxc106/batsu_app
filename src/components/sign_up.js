import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import './app.css';


class Sign_Up extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                fname: 'test',
                lname: 'user',
                phone: '7142323333',
                email: 'kelsey@gmail.com',
                password: 'passW0rdhaHAA',
                password_conf: 'passW0rdhaHAA',
                dob: ''
            }
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log('Called handleFormSubmit', this.state.form);
        const newState = {
            form: {
                fname: '',
                lname: '',
                phone: '',
                email: '',
                password: '',
                password_conf: '',
                dob: ''
            }

        }
        this.setState(newState);
        this.handleAxios();
    }

    handleAxios(){
        const {form} = this.state;

        axios.post(`http://localhost:8888/form.php?operation=insertUser`, form).then((resp) => {
            console.log('this is the response from insert:', resp);
        })
    }

    handleChange(event){
        const {name, value} = event.target;
        const {form} = this.state;
        form[name] = value;
        this.setState({form: {...form}});
    }

    render() {
        const {fname, lname, phone, email, password, password_conf, dob} = this.state.form;
        return (
            <div className="signup-page">
                <h1 className="batsu-title-signup">Sign Up</h1>
                <form onSubmit={(event) => {this.handleFormSubmit(event)}} >
                    <div>
                        <h6 className="signin-subtitles">First Name</h6>
                        <input className="signup_info" name="fname" value={fname} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div>
                        <h6 className="signin-subtitles">Last Name</h6>
                        <input className="signup_info" name="lname" value={lname} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div>
                        <h6 className="signin-subtitles">Phone Number</h6>
                        <input className="signup_info" name="phone" type="number" value={phone} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div>
                        <h6 className="signin-subtitles">E-mail Address</h6>
                        <input className="signup_info" name="email" value={email} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div>
                        <h6 className="signin-subtitles">Password</h6>
                        <input className="signup_info" name="password" type="password" value={password} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div>
                        <h6 className="signin-subtitles">Re-enter Password</h6>
                        <input className="signup_info" name="password_conf" type="password" value={password_conf} onChange={(event) => this.handleChange(event)} />
                    </div>
                    <div>
                        <h6 className="signin-subtitles">Date of Birth</h6>
                        <input className="signup_info" name="dob" type="date" value={dob} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <button className="back-signup-button"><Link to="/">Back</Link></button>
                    <button className="submit-signup-button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Sign_Up;