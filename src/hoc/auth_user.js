
import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function(ComposedComponent) {
    console.log('wutface');
    class Auth extends Component {

        componentWillMount() {
            console.log(this.props);
            if(!this.props.authenticated){
                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.authenticated){
                this.props.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authorized };
    }

    return connect(mapStateToProps)(Auth);
}