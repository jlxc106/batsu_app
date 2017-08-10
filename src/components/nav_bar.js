import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import Home from './home';
import Sign_Up from './sign_up';
import Events from './events';
import './app.css';


class NavBar extends Component {
    showSettings(event){
        event.preventDefault();
    }

    render() {
        return(
            <div className="topHeader">
                <h3 className="topHeaderTitle">_Batsu</h3>
                <Menu width={'175px'} className="bm-menu">
                    <a className="menu-item" href="/">Home</a>
                    <a className="menu-item" href="/profile">Profile</a>
                    <a className="menu-item" href="/map">Events</a>
                    <a className="menu-item" href="/about">About</a>
                    <a className="menu-item" href="/">Log Off</a>
                </Menu>
            </div>
        );
    }
}

export default NavBar;