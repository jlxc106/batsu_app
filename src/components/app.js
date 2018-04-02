import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login_Page from './login_page';
import SignUp from './sign_up';
import Home from './home';
import Profile from './profile';
import EventList from './user_event_list';
import WhatIsBatsu from './what_is_batsu';
import CreatedEvent from './preview_event';
import authUser from '../hoc/auth_user';
import hideFromAuthUser from '../hoc/hide_from_auth_user';
import NavBar from './nav_bar';
import './app.css';


const App = () => (
    <div className="topbar-menu">
        <NavBar /> 
        <Switch>
            <Route exact path="/" component={hideFromAuthUser(Login_Page)} />
            <Route path="/sign_up" component={hideFromAuthUser(SignUp)} />
            <Route path="/home" component={authUser(Home)} />
            <Route path="/profile" component={authUser(Profile)} />
            <Route path="/events" component={authUser(EventList)} />
            <Route path="/what_is_batsu" component={authUser(WhatIsBatsu)} />
            <Route path="/preview_event" component={authUser(CreatedEvent)} />
            <Route path="/" component={authUser(Home)} />
        </Switch>
    </div>
)


export default App;