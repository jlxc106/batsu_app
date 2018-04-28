import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom';
import {getSignOut} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class NavBar extends Component {
    constructor(props){
        super(props);

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.getSignOut();
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        $('.bm-cross-button > button').click();
    }

    render() {
        if(!this.props.logged_in && !document.cookie){
        // if (location.pathname === "/" || location.pathname === "/sign_up"){
            return null;
        } else {
            return (
                <div className="topHeader">
                    <h3 className="topHeaderTitle"><Link id="topHeaderLink" to="/home">Batsu</Link></h3>
                    <Menu width={'222px'} className="bm-menu">
                        <Link className="menu-item" onClick={() => $('.bm-cross-button > button').click()} to="/home">Home</Link>
                        <Link className="menu-item" onClick={() => $('.bm-cross-button > button').click()} to="/profile">Profile</Link>
                        <Link className="menu-item" onClick={() => $('.bm-cross-button > button').click()} to="/events">My Events</Link>
                        <Link className="menu-item" onClick={() => $('.bm-cross-button > button').click()} to="/what_is_batsu">What's Batsu?</Link>
                        <Link className="menu-item" onClick={this.logOut} to="/">Log Off</Link>
                    </Menu>
                </div>
            );
        }
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getSignOut},dispatch);
}

function mapStateToProps(state){
    return {logged_in: state.userInfo.logged_in}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);