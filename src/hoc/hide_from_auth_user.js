
import React, { Component } from 'react';

export default function(ComposedComponent) {
    return class Auth extends Component {

        componentWillMount() {
            if(document.cookie){
                this.props.history.push('/home');
            }
        }

        componentWillUpdate(nextProps) {
            if(document.cookie){
                this.props.history.push('/home');
            }
        }
        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

}