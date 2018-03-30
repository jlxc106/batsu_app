import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom';
//import './app.css';


class NavBar extends Component {
    // showSettings(event) {
    //     event.preventDefault();
    // }

    logOut() {
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
                        <Link className="menu-item" onClick={() => $('.bm-cross-button > button').click()} to="/home">Home</Link>
                        <Link className="menu-item" onClick={() => $('.bm-cross-button > button').click()} to="/profile">Profile</Link>
                        <Link className="menu-item" onClick={() => $('.bm-cross-button > button').click()} to="/my_events">My Events</Link>
                        <Link className="menu-item" onClick={() => $('.bm-cross-button > button').click()} to="/what_is_batsu">What's Batsu?</Link>
                        <Link className="menu-item" onClick={this.logOut} to="/">Log Off</Link>
                    </Menu>
                </div>
            );
        }
    }
}

export default NavBar;