import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LogInForm from './title_input';
// import DropDownForm from './dropdown_title';
import Event from './events';
// import Modal from 'react-modal';
import './app.css';
import Sign_Up from './sign_up.js';



const Home = () => (

    <div className="batsu-app">
        <h1 className="batsu-title">Batsu</h1>
        <LogInForm/>
        <div>
            <div className="signup-top-div">
                <button className="signup-button">
                    <Link to="/sign_up">Sign Up</Link>
                </button>
                <Route path="/sign_up" component={Sign_Up} />
            </div>
            <div className="line_space"></div>
            <div className="fb-login-button" data-button-type="continue_with" data-size="medium" scope="public_profile,email" data-onlogin="checkLoginState();"></div>
            <h4 className="login_trouble">Having Trouble Logging In?</h4>
            <div className="title_bottom_links">
                <Link className="title_routes" to="/">Contact</Link>
                <Link className="title_routes" to="/">Legal</Link>
                <Link className="title_routes" to="/">Privacy</Link>
            </div>
        </div>
    </div>
)


export default Home;
