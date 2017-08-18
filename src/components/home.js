import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SignIn from './title_input';
import Event from './events';
import './app.css';


const Home = (props) => {
    return (
        <div className="batsu-app">

            <h1 className="batsu-title">_Batsu</h1>
            <div>
                <SignIn history={props.history} />

                <div className="line_space"></div>
                <div className="fb-login-button" data-button-type="login_with" data-size="large" scope="public_profile,email" data-onlogin="checkLoginState();"></div>
            </div>
        </div>
    )
}

export default Home;
