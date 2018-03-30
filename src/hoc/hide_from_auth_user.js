
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {browserHistory } from 'react-router-dom';

export default function(ComposedComponent) {
    // console.log('wutface');
    class Auth extends Component {

        componentWillMount() {
            // console.log(this.props);
            if(document.cookie){
            // if(!this.props.authenticated){
                console.log("props: ", this.props);
                console.log("state: ", this.state);
                this.props.history.push('/home');
            }
        }

        // componentWillUpdate(nextProps) {
        //     console.log(nextProps);
        //     if(!nextProps.authenticated){
        //         this.props.history.push('/');
        //     }
        // }
        componentWillUpdate(nextProps) {
            console.log("nextprops: ", nextProps);
            if(document.cookie){
            // if(!nextProps.authenticated){
                this.props.history.push('/home');
            }
        }
        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        // console.log("state: ", state);
        return { authenticated: state.auth.authorized };
    }

    return connect(mapStateToProps)(Auth);
}