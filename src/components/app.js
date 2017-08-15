import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './home';
import Sign_Up from './sign_up';
import Profile from './profile';
import Map from './map';
import AfterEventCreation from './preview_event';



class App extends React.Component{
    // constructor(props){
    //   super(props);
    //   this.state ={
    //       listDataFromChild : null
    //   }
    // };

    // myCallback = (dataFromChild) =>{
    //     this.setState({ listDataFromChild: dataFromChild});
    // },

    render(){
        return(
            <div className="topbar-menu">
                <Route exact path="/" component={Home} />
                <Route path="/sign_up" component={Sign_Up} />
                <Route path="/profile" component={Profile} />
                <Route path="/map" component={Map} />
                <Route path="/after_event_creation" component={AfterEventCreation} />
            </div>

        );
    }
}

export default App;