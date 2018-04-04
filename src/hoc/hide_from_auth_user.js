
import React, { Component } from 'react';

export default function(ComposedComponent) {
    return class Auth extends Component {

        componentWillMount() {
            if(document.cookie){
                console.log("props: ", this.props);
                console.log("state: ", this.state);
                this.props.history.push('/home');
            }
        }

        componentWillUpdate(nextProps) {
            console.log("nextprops: ", nextProps);
            if(document.cookie){
                this.props.history.push('/home');
            }
        }
        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

}