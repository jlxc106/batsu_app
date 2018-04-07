import React, { Component } from 'react' ;
import { withGoogleMap, GoogleMap, Marker, Circle} from "react-google-maps";
import LoadingImg from './imgs/loading2.gif';
import {storeLocation} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Maps extends Component {
    constructor(props){
        super(props);

        // this.getUserPermision = this.getUserPermision.bind(this);
    }

    componentWillMount() {
        this.props.storeLocation();



        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(this.getUserPermision);
        // } else {
        //     console.log("Geolocation is not supported by this browser.");
        // }
    }

    // getUserPermision(position) {
    //     console.log("position", position);
    //     this.props.storeLocation(position.coords);
    // }

    render(){
        const image = {
            url: 'https://cdn1.iconfinder.com/data/icons/pretty-office-part-13-simple-style/512/user-green.png',
            scaledSize: new google.maps.Size(52, 53)
        };
        // const markers = this.props.markers[0].position || []
        // const radius = this.props.radius || {}
        // console.log(state);

        let { lat, lng } = this.props;
        // console.log("this.props: ", this.props);
        if (!this.props.lat){
            return <img id="loading" className="map_loading_img" src={LoadingImg} alt=""/>
        }
        return(
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{lat, lng}}>
                {this.props.markers.map((marker, index)=>{
                    // console.log("marker: ",marker);
                    return(
                        <Marker
                        key={index}
                        position={{lat: marker.position.lat,
                                lng: marker.position.long}}
                        icon={image}/>
                    )
                })}
                 
             </GoogleMap>
         )
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({storeLocation},dispatch);
}

function mapStateToProps(state){
    // console.log(state);
    if(state.userLocation.lat){
        return {lng: state.userLocation.long, lat: state.userLocation.lat};
    }
    return {lng: 0, lat: 0};
}

export default withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(Maps));