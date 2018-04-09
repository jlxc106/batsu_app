import React, { Component } from 'react' ;
import { withGoogleMap, GoogleMap, Marker, Circle} from "react-google-maps";
import LoadingImg from './imgs/loading2.gif';
import {storeLocation} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Maps extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.storeLocation();
    }

    render(){
        const image = {
            url: 'https://cdn1.iconfinder.com/data/icons/pretty-office-part-13-simple-style/512/user-green.png',
            scaledSize: new google.maps.Size(52, 53)
        };

        let { lat, lng } = this.props;
        if (!this.props.lat){
            return <img id="loading" className="map_loading_img" src={LoadingImg} alt=""/>
        }
        return(
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{lat, lng}}>
                {this.props.markers.map((marker, index)=>{
                    if(marker.type === "userLocation"){
                        return(
                            <Marker
                            key={index}
                            position={{lat: marker.lat,
                                    lng: marker.lng}}
                            icon={image}/>
                        )    
                    }
                    return(
                        <Marker
                        key={index}
                        position={{lat: marker.lat,
                                lng: marker.lng}}
                        />
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
    if(state.userLocation.lat){
        return {lng: state.userLocation.lng, lat: state.userLocation.lat};
    }
    return {lng: 0, lat: 0};
}

export default withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(Maps));