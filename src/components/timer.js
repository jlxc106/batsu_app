import React, { Component } from 'react';
import axios from 'axios';


class Timer extends Component {
    constructor(props){
        super(props);

        this.state = {
            eventID: props.eventID,
            eventTime: new Date("Aug 15, 2017 15:27:00").getTime(),
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
            distance: null
        }
    }

    componentWillMount() {
        this.handleAxios();
        console.log(this.state);
    }


//finish axios call
    handleAxios(){
        axios.get('http://localhost/c5.17_accountability/form.php?operation=getTime&event='+this.state.eventID).then((resp) => {
            console.log('this is the response:', resp);
            this.setState({
                eventTime: new Date(resp.data.data.dateTime).getTime()

            })
            this.changeTime();
        });
    }

    changeTime() {
        setInterval(() => {
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
        })
    }

    formatTime() {
        return (
            this.state.days + "d " + this.state.hours + "h " + this.state.minutes + "m " + this.state.seconds + "s"
        )
    }

    render() {
        if(this.state.distance <= 0){
            return <h1>Event Ended</h1>
        } else {
            return <h1>{this.formatTime()}</h1>
        }

    }
}


export default Timer;