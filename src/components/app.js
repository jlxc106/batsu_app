import React from 'react';
import {BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Home from './home';
import Sign_Up from './sign_up';
import Events from './events';
import Profile from './profile';
import NavBar from './nav_bar';


const App = () => (
    <div className="topbar-menu">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/sign_up" component={Sign_Up} />
        <Route path="/profile" component={Profile} />
        <Route path="/events" component={Events}/>
    </div>
)

export default App;