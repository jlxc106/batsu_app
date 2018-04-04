import React, { Component } from 'react';
import axios from 'axios';


class Timer extends Component {
    constructor(props){
        super(props);

        this.state = {
            IntervalID : null,
            eventID: props.eventID,
            eventTime:null,
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            distance: null
        }
    }

    componentDidMount() {
        this.handleAxios();
        // console.log(this.state);
    }

//finish axios call
    handleAxios(){
        axios.get('http://jayclim.com/php/form.php?operation=getTime&event='+this.state.eventID).then((resp) => {
            // console.log('this is the response:', resp);
            this.setState({
                eventTime: new Date(resp.data.data.dateTime).getTime()
            })
            this.changeTime();
        });
    }

    changeTime() {
        // const intervalID = setInterval(() => {
        //     let currentTime = new Date().getTime();
        //     let distance = this.state.eventTime - currentTime;
        //     let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        //     let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        //     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        //     let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        //     console.log("state: ", this.state);
        //     this.setState({
        //         days,
        //         hours,
        //         minutes,
        //         seconds,
        //         distance
        //     });
        // }, 1000);
        this.setState({IntervalID: setInterval(() => {
            let currentTime = new Date().getTime();
            let distance = this.state.eventTime - currentTime;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.setState({
                days,
                hours,
                minutes,
                seconds,
                distance
            });
        }, 1000)});
    };

    componentWillUnmount(){
        clearInterval(this.state.IntervalID);
    }

    formatTime() {
        return (
            this.state.days + "days " + this.state.hours + "h " + this.state.minutes + "m " + this.state.seconds + "s"
        )
    }

    render() {
        if(!this.state.distance){
            return <h1>Loading...</h1>
        }
        if(this.state.distance <= 0){
            return <h1>Event Ended</h1>
        } else {
            return <h1>{this.formatTime()}</h1>
        }
    }
}


export default Timer;