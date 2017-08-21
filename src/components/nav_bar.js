import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import './app.css';


class NavBar extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    logOut() {
        // console.log("~log out~");
        document.cookie = "token=" + ";expires=" + new Date(0);
    }

    render() {
        if (location.pathname === "/" || location.pathname === "/sign_up"){
            return null;
        } else {
            return (
                <div className="topHeader">
                    <h3 className="topHeaderTitle">Batsu</h3>
                    <Menu width={'222px'} className="bm-menu">
                        {/* <a className="menu-item" href="/">Home</a> */}
                        <a className="menu-item" href="/home">Home</a>
                        <a className="menu-item" href="/profile">Profile</a>
                        <a className="menu-item" href="/my_events">My Events</a>
                        <a className="menu-item" href="/what_is_batsu">What's Batsu?</a>
                        <a className="menu-item" onClick={this.logOut} href="/">Log Off</a>
                    </Menu>
                </div>
            );
        }
    }
}

export default NavBar;