import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import Home from './home';
import Sign_Up from './sign_up';
import Events from './events';
import MyEvents from './my_events';
import HowTo from './how_to';
import CreatedEvent from './preview_event';
import './app.css';
// import {Link} from 'react-router-dom';

class NavBar extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    logOut() {
        console.log("~log out~");
        document.cookie = ";" + new Date(0);
        console.log("document.cookie: ",document.cookie)
    }

    render() {
        return (
            <div className="topHeader">
                <h3 className="topHeaderTitle">_Batsu</h3>
                <Menu width={'175px'} className="bm-menu">
                    <a className="menu-item" href="/map">Home</a>
                    <a className="menu-item" href="/profile">My Profile</a>
                    <a className="menu-item" href="/map">Map</a>
                    <a className="menu-item" href="/my_events">My Events</a>
                    <a className="menu-item" href="/how_to">How To</a>
                    <a className="menu-item" href="/about">About</a>
                    <a className="menu-item" href="/preview_event">Created Event</a>
                    <a className="menu-item" onClick={this.logOut} href="/">Log Off</a>
                </Menu>
            </div>
        );
    }
}

export default NavBar;