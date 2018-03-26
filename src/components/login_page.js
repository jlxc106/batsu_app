import React from 'react';
import { Route, Link } from 'react-router-dom';
import SignIn from './sign_in';
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
