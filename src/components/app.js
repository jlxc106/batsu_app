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

 
// const App = () => (
//     <div className="topbar-menu">
//         <NavBar /> 
//         <Route exact path="/" component={Login_Page} />
//         <Route path="/sign_up" component={SignUp} />
//         <Route path="/home" component={authUser(Home)} />
//         <Route path="/profile" component={authUser(Profile)} />
//         <Route path="/my_events" component={authUser(MyEvents)} />
//         <Route path="/what_is_batsu" component={authUser(WhatIsBatsu)} />
//         <Route path="/preview_event" component={authUser(CreatedEvent)} />
//     </div>
// )

// const App = () => (
//     <div className="topbar-menu">
//         <NavBar /> 
//         <Route path="/sign_up" component={SignUp} />
//         <Route path="/home" component={Home} />
//         <Route path="/profile" component={Profile} />
//         <Route path="/my_events" component={EventList} />
//         <Route path="/what_is_batsu" component={WhatIsBatsu} />
//         <Route path="/preview_event" component={CreatedEvent} />
//         <Route exact path="/" component={Login_Page} />
//     </div>
// )

const App = () => (
    <div className="topbar-menu">
        <NavBar /> 
        <Switch>
            <Route exact path="/" component={hideFromAuthUser(Login_Page)} />
            <Route path="/sign_up" component={hideFromAuthUser(SignUp)} />
            <Route path="/home" component={authUser(Home)} />
            <Route path="/profile" component={authUser(Profile)} />
            <Route path="/my_events" component={authUser(EventList)} />
            <Route path="/what_is_batsu" component={authUser(WhatIsBatsu)} />
            <Route path="/preview_event" component={authUser(CreatedEvent)} />
        </Switch>
    </div>
)


export default App;