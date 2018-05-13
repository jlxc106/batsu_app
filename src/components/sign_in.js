import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import SignUp from './sign_up.js';
import { renderInput } from './render_input';
import { connect } from 'react-redux';
import { getSignIn, clearErrors } from '../actions/index';


class SignIn extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.clearErrors();
    }

    render(){
        let {handleSubmit, signinError} = this.props;
        if(signinError === undefined){
            signinError = [];
        }
        return(
            <div className="login_page">
                <form id="login_form"onSubmit={handleSubmit(vals => this.props.getSignIn(vals, this.props.history))}> 
                    <h6 className="login-subtitles">E-mail</h6>
                    <Field name="email" type="email" component={renderInput} />
                    <h6 className="login-subtitles">Password</h6>
                    <Field name="password" type="password" component={renderInput} />
                    <ul className="text-danger list-group">
                    {
                        signinError.map((error_msg, index)=>{
                            if(error_msg){
                                return(
                                    <li key={index}>{error_msg}</li>
                                )
                            }
                        })
                    }
                    </ul>
                    <button type="submit" className="login-button" >Log In</button>
                </form>
                <div className="signup-top-div">
                    <button className="signup-button">
                        <Link to="/sign_up">Sign Up</Link>
                    </button>
                </div>
            </div>
        )
    }
}

function validate(vals){
    const error = {};

    if (!vals.email){
        error.email = "Please enter an e-mail";
    }
    if(vals.email){
        const re_email = /^([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re_email.test(vals.email)){
            error.email = "enter a valid email address"
        }
    }
    if (!vals.password){
        error.password = "Please enter a password";
    }
    if(vals.password){
        const re_pw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;
        if(!re_pw.test(vals.password)){
            error.password = "enter valid password"
        }
    }
    return error;
}

function mapStateToProps(state){
    return{
        signinError: state.userInfo.error,
    }
}

export default reduxForm({
    form: 'signin',
    validate
    })(connect(mapStateToProps, {getSignIn, clearErrors})(SignIn));
