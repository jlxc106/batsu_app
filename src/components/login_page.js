import React from 'react';
import { Route, Link } from 'react-router-dom';
import SignIn from './sign_in';
import SignUp from './sign_up';


const Login_Page = (props) => {
    return (
        <div className="batsu-app">
            <h1 className="batsu-title">Batsu</h1>
            <div>
                <SignIn history={props.history} />
                <div className="line_space"></div>
            </div>
            <div>
            <Link className="login-batsu-info" to="/what_is_batsu">What's Batsu?</Link>
            </div>
        </div>
    )
}

export default Login_Page;
