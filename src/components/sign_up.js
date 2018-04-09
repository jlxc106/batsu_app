import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { getSignUp, clearErrors } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderInput } from './render_input';

class SignUp extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.clearErrors();
    }

    handleSignup(vals){
        this.props.getSignUp(vals, this.props.history);
    }

    render() {
        const {handleSubmit, signupError} = this.props;
        return (
            <div className="signup-page">
                <h1 className="batsu-title-signup">Sign-Up</h1>
                <div className="signup-main">
                    <form onSubmit={handleSubmit((vals) => this.handleSignup(vals))}>
                        <div>
                            <h6 className="signin-subtitles">First Name</h6>
                            <Field className="signup_info" name="fname" component={renderInput}/>
                        </div>
                        <div>
                            <h6 className="signin-subtitles">Last Name</h6>
                            <Field className="signup_info" name="lname" component={renderInput}/>
                        </div>
                        <div>
                            <h6 className="signin-subtitles">Phone Number</h6>
                            <Field className="signup_info" name="phone" type="number" component={renderInput}/>
                        </div>
                        <div>
                            <h6 className="signin-subtitles">E-mail Address</h6>
                            <Field className="signup_info" name="email" type="email" component={renderInput}/>
                        </div>
                        <div>
                            <h6 className="signin-subtitles">Password</h6>
                            <Field className="signup_info" name="password" type="password" component={renderInput}/>
                        </div>
                        <div>
                            <h6 className="signin-subtitles">Re-enter Password</h6>
                            <Field className="signup_info" name="password_conf" type="password" component={renderInput}/>
                        </div>
                        <div>
                            <h6 className="signin-subtitles">Date of Birth</h6>
                            <Field className="signup_info" name="dob" type="date" component={renderInput} />
                        </div>
                        <ul className="text-danger">
                        {()=>{
                            if(signupError){
                                signupError.map((error_msg, index)=>{
                                    if(error_msg){
                                        return(
                                            <li key={index}>{error_msg}</li>
                                        );
                                    }
                                })
                            }
                        }}
                        </ul>
                        <button className="back-signup-button" type="button"><Link to="/" >Back</Link></button>
                        <button className="submit-signup-button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

function validate(vals){
    const error = {};

    if (!vals.fname){
        error.fname = "Please enter a first name";
    }
    if (!vals.lname){
        error.lname = "Please enter a last name";
    }
    if (!vals.phone){
        error.phone = "Please enter a phone number";
    }
    if (!vals.email){
        error.email = "Please enter an e-mail";
    }
    if (!vals.password ){
        error.password = "Please enter a password";
    }
    if (vals.password !== vals.password_conf){
        error.password_conf = "Passwords must match";
    }
    if (!vals.dob){
        error.dob = "Please enter a date of birth";
    }
    
    return error;
}



function mapStateToProps(state){
    return{
        signupError: state.userInfo.error
    }
}

export default reduxForm({
    validate,
    form: 'signup'
})(
    connect(mapStateToProps, {getSignUp, clearErrors})(SignUp)
);