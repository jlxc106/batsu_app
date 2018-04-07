import React, { Component } from 'react';
import axios from 'axios';


class Timer extends Component {
    constructor(props){
        super(props);


        this.state = {
            IntervalID : null,
            eventID: props.eventID,
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            time_difference: null
        }
    }

    componentWillMount() {
        this.changeTime();
    }

    changeTime() {
        this.setState({IntervalID : setInterval(() => {
            try{
                let currentTime = new Date().getTime();
                let time_difference = this.props.eventTime - currentTime;
                let days = Math.floor(time_difference / (1000 * 60 * 60 * 24));
                let hours = Math.floor((time_difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((time_difference % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((time_difference % (1000 * 60)) / 1000);
                this.setState({
                    days,
                    hours,
                    minutes,
                    seconds,
                    time_difference
                });
            }
            catch(error){
                console.error(error);
                clearInterval(this.state.IntervalID);
            }
        }, 1000)});
    };

    componentDidCatch(error, info){
        console.error(info);
        clearInterval(this.state.IntervalID);
    }


    componentWillUnmount(){
        console.log(this.state);
        clearInterval(this.state.IntervalID);
    }

    formatTime() {
        return (
            this.state.days + "days " + this.state.hours + "h " + this.state.minutes + "m " + this.state.seconds + "s"
        )
    }

    render() {
        if(!this.state.time_difference){
            return <h1>Loading...</h1>
        }
        if(this.state.time_difference <= 0){
            return <h1>Event Ended</h1>
        } else {
            return <h1>{this.formatTime()}</h1>
        }
    }
}


export default Timer;