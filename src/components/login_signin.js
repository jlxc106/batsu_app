import React from 'react';
import { Route, Link } from 'react-router-dom';
import SignIn from './login_component';
import SignUp from './sign_up';
import './app.css';


const Login_Page = (props) => {
    return (
        <div className="batsu-app">
            <h1 className="batsu-title">Batsu</h1>
            <div>
                <SignIn history={props.history} />
                <div className="line_space"></div>
            </div>
        </div>
    )
}

export default Login_Page;
{/*<div className="fb-login-button" data-button-type="login_with" data-size="large" scope="public_profile,email" data-onlogin="checkLoginState();"></div>*/}
