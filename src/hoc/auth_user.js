import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserInfo} from '../actions/index';
import _ from 'lodash';

export default function(ComposedComponent) {
    class Auth extends Component {

        componentWillMount() {
            if(!document.cookie){
                this.props.history.push('/');
            }
            else if(document.cookie){
                if(_.isEmpty(this.props.profile) || _.isEmpty(this.props.events)){
                    this.props.getUserInfo({ token: document.cookie.split("=")[1]});
                }
            }
        }

        componentWillUpdate(nextProps) {
            if(!document.cookie){
                this.props.history.push('/');
            }
        }
        
        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return { profile: state.userInfo.profile, events: state.userInfo.events}
    }

    function mapDispatchToProps(dispatch){
        return bindActionCreators({ getUserInfo },dispatch);;
    }

    return connect(mapStateToProps, mapDispatchToProps)(Auth);
}

